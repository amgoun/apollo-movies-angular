import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { MovieDetailComponent } from './public/movie-detail/movie-detail.component';
import { PagenotfoundComponent } from './public/pagenotfound/pagenotfound.component';
import { SignupComponent } from './public/signup/signup.component';
import { SingleCommentComponent } from './public/single-comment/single-comment.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'movie-detail/:id', component: MovieDetailComponent },
  { path: 'single-comment/:id', component: SingleCommentComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
