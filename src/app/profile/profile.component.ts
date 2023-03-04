import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User, Movie, Comment } from '../generated/generated';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

import {
  GET_USER,
  MY_COMMENTS,
  MY_MOVIES,
  ADD_MOVIE_MUTATION,
} from 'src/app/graphql';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: User | undefined = undefined;
  logged: boolean = false;
  isAdmin: boolean = false;

  myComments: Comment[] = [];

  haveComments: boolean | undefined;

  profileToupdate = {
    username: '',
    email: '',
  };

  expand: boolean = false;

  userRole: 'ADMIN' | 'REVIEWER' | undefined = undefined;
  userId = localStorage.getItem('User_Id');

  allMovies: Movie[] = [];
  //myMovies: Movie[] = [];
  loading: boolean = true;

  p: number = 1;
  PER_PAGE: number = 10;
  totalMovies: number | undefined;

  // create movie feature
  title: string = '';
  description: string = '';
  thumbnailUrl: string = '';
  relaseDate: string = '';
  genres: Array<Object> = [
    'ACTION',
    'COMEDY',
    'DRAMA',
    'HORROR',
    'MYSTERY',
    'ROMANCE',
    'OTHER',
  ];

  genrelist = this.genres[0];

  constructor(
    private router: Router,
    private apollo: Apollo,
    private route: ActivatedRoute,
    private toast: NgToastService,
    private authService: AuthService
  ) {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      this.logged = isAuthenticated;
    });
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery<User>({
        query: GET_USER,
        variables: {
          userId: this.userId,
        },
      })
      .valueChanges.subscribe((response: any) => {
        this.user = response.data.user;
        this.userRole = this.user?.role;

        if (this.userRole === 'ADMIN') {
          this.isAdmin = true;
        }
      });

    this.apollo
      .watchQuery<any>({
        query: MY_COMMENTS,
        variables: {
          author: {
            id: this.userId,
          },
        },
      })
      .valueChanges.subscribe((response: any) => {
        this.myComments = response.data.myComments;
        if (this.myComments.length > 0) {
          this.haveComments = true;
        }
      });

    // my movies
    this.apollo
      .watchQuery<any>({
        query: MY_MOVIES,
        variables: {
          authorId: this.userId,
          orderBy: {
            updatedAt: 'desc',
          },
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.allMovies = data.myMovies;
        this.loading = data.loading;
        this.totalMovies = data.myMovies.length;    
      });
  }

  updateProfile(updateProfileForm: NgForm) {
    const data = {
      username: this.profileToupdate.username,
      email: this.profileToupdate.email,
    };

    if (updateProfileForm.valid) {
      this.authService.updateProfile(data);
      updateProfileForm.reset();
    }
  }

  addMovie(addMovieForm: NgForm) {
    const data = {
      title: this.title,
      thumbnailUrl: this.thumbnailUrl,
      description: this.description,
      relaseDate: this.relaseDate,
      genre: this.genrelist,
    };

    if (addMovieForm.valid) {
      this.apollo
        .mutate({
          mutation: ADD_MOVIE_MUTATION,
          refetchQueries: [{ query: MY_MOVIES }],
          variables: {
            data,
          },
        })
        .subscribe({
          next: (data: any) => {
            this.toast.success({
              detail: 'Success Message',
              summary: 'movie created succesful',
            });
          },
          error: (error) => {
            this.toast.error({
              detail: 'ops! ',
              summary: error,
            });
          },
        });

      addMovieForm.resetForm();
    }
  }

  togleMenu() {
    this.expand = !this.expand;
  }
}
