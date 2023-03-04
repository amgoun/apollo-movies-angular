import { Component,  OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Movie } from '../../generated/graphql'
import { GET_MOVIES } from 'src/app/graphql';
import { Router, ActivatedRoute } from '@angular/router';



@Component({

  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  
})

export class HomeComponent implements OnInit {
  //count = 0;
 // first$: Observable<number> | undefined
 // skip$: Observable<number> | undefined
  p: number = 1;
  PER_PAGE: number = 6
  totalMovies: number | undefined

  //allMovies: Observable<Movie> | undefined
  allMovies: Movie [] = []
  loading: boolean = true;

  constructor( private apollo : Apollo,
      private router: Router, 
       private route: ActivatedRoute,
       ){}

  ngOnInit(): void {

    this.apollo.watchQuery<any>({
      query: GET_MOVIES,
      variables: {
     
        orderBy:{
          updatedAt: 'desc'
        },
          //skip:0,
          //take: this.PER_PAGE 
      }
    }).valueChanges
      .subscribe(({data, loading}) => {
      this.allMovies = data.movies
      this.loading = data.loading;
      this.totalMovies = data.movies.length
    }) 
  }

}
