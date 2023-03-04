import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Apollo } from 'apollo-angular';
import { MOVIE_CREATED_SUBSCRIPTION } from 'src/app/graphql';
import { NgToastService } from 'ng-angular-popup';
import { Movie } from '../../generated/graphql';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean | undefined;
  expand: boolean = false;

  newMovie: Movie | undefined;
  //token: string | undefined

  private isTokenExpired(token: string) {
   if( this.isLoggedIn) {
    const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
   }
    return this.isTokenExpired
  }

  constructor(
    private authService: AuthService,
    private apollo: Apollo,
    private toast: NgToastService,
    private router: Router,

 
  ) {
    this.authService.isAuthenticated.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }
  login() {
    this.authService.login;
  }
  logout() {
    this.authService.logout();
  }
  togleMenu() {
    this.expand = !this.expand;
  }
  ngOnInit(): void {



    if (this.isLoggedIn) {
      this.apollo
        .subscribe({
          query: MOVIE_CREATED_SUBSCRIPTION,
        })
        .subscribe((response: any) => {
          this.newMovie = response.data?.movieCreated;
          this.toast.info({
            detail: 'new movie added',
            summary: 'Title:' + ' \ ' + this.newMovie?.title,
            duration: 10000,
          });
        });
    }

    
   const token = localStorage.getItem("token")
    if (!this.isTokenExpired(token as string)) {
      console.log('token expired')
     this.logout()
    } 
  } 
}



/* Option 1 - Manual

Token expiry time is encoded in the token in UTC time format. So it can be fetched and checked manually against current time in UTC. Try the following */