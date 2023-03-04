import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Movie } from '../../generated/graphql';
import { GET_MOVIE, CREATE_COMMENT, UPDATE_MOVIE_MUTATION, DELET_MOVIE, LIKE_MOVIE, GET_MOVIES } from 'src/app/graphql';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined = undefined;
  id: string | number | undefined;
  // comment
  comments: Comment[] = [];
  content: string = '';
  isLoggedIn: boolean = false;

  authorId: string| undefined = undefined;
  userId = localStorage.getItem('User_Id');

  // update movie feature 
  title : string =''
  description: string =''
  thumbnailUrl: string = ''
  relaseDate : string = '';
  genres:Array<Object> = [
     "ACTION",
     "COMEDY",
     "DRAMA",
     "HORROR",
     "MYSTERY",
     "ROMANCE",
     "OTHER"
];

 genrelist = this.genres[0];

 expand: boolean = false;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toast: NgToastService
  ) {
    this.authService.isAuthenticated.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

 
  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.apollo
      .watchQuery<Movie>({
        query: GET_MOVIE,
        variables: {
          movieId: this.id,
        },
      })
      .valueChanges.subscribe((response: any) => {
        this.movie = response.data.movie;
        this.authorId = this.movie?.author.id
        
      });
  }

  submitComment(commentForm: NgForm) {
    const data = {
      content: this.content,
      movie: this.id,
    };

    if (this.isLoggedIn === false) {
      this.toast.error({ detail: 'error ', summary: 'please login' });
      commentForm.resetForm();
    }
    if (commentForm.valid) {
      this.apollo
        .mutate({
          mutation: CREATE_COMMENT,
          refetchQueries: [{ query:GET_MOVIES }],
          variables: {
            data,
          },
        })
        .subscribe({
          next: () => {
            this.toast.success({
              detail: 'Success Message',
              summary: 'comment submited succesful',
            });
        /*       window.setTimeout(function () {
              location.reload();
            }, 2000);  */
          },
          error: () => {
            this.toast.error({
              detail: 'ops! ',
              summary: 'somting goes wrong',
            });
          },
        });
        commentForm.resetForm()
    }
  
  }

  updateMovie(updateMovieForm: NgForm) {
   
    const data = {
      title:this.title,
      thumbnailUrl: this.thumbnailUrl,
      description:this.description,
      relaseDate:this.relaseDate,
      genre:this.genrelist,
    }

    if (this.isLoggedIn === false) {
      this.toast.error({ detail: 'error ', summary: 'please login' });
     
    }
    if (updateMovieForm.valid) {
      this.apollo
        .mutate({
          mutation: UPDATE_MOVIE_MUTATION,
          refetchQueries: [{query: GET_MOVIES }],
          variables: {
            updateMovieId: this.id,
            data,
          },  
        })
        .subscribe({ 
          next: () => {
            this.toast.success({
              detail: 'Success Message',
              summary: 'movie updated succesful',
            });
          },
          error: (error) => {
            this.toast.error({
              detail: 'ops! ',
              summary: error
            });
          },
        });

        updateMovieForm.resetForm();
        this. togleMenu()
    }
  }

  deleteMovie(){
    this.apollo
    .mutate({
      mutation: DELET_MOVIE,
      variables: {
        deleteMovieId : this.id
      },
    })
    .subscribe({
      next: () => {
        this.toast.warning({
          detail: 'warning Message',
          summary: 'movie deleted succesful',
        });
          window.setTimeout(function () {
          location.reload();
          window.location.href="/profile";
        }, 2000); 
      },
      error: () => {
        this.toast.error({
          detail: 'ops! ',
          summary: 'somting goes wrong',
        });
      },
    });
  }

  likeMovie() {

    this.apollo
    .mutate({
      mutation: LIKE_MOVIE,
      refetchQueries: [{query: GET_MOVIES }],
      variables: {
        movieId : this.id
      },
    })
    .subscribe({ 
      error: (error) => {
        this.toast.error({
          detail: 'ops! ',
          summary: error,
        });
      },
    });
  }
  
  togleMenu() {
    this.expand = !this.expand;
  }
}
