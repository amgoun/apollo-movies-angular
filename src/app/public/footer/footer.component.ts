import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/generated/graphql';

@Component({

  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],

})
export class FooterComponent implements OnInit {

  p: number = 1;
  itemsPerPage: number = 6
  totalMovies: any
  //allMovies: Observable<Movie> | undefined
  allMovies: Movie [] = []
  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
