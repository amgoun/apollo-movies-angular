import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './public/header/header.component';
import { FooterComponent } from './public/footer/footer.component';
import { MovieDetailComponent } from './public/movie-detail/movie-detail.component';
import { HomeComponent } from './public/home/home.component';
import { PagenotfoundComponent } from './public/pagenotfound/pagenotfound.component';
import { DateAgoPipe } from './public/pipes/date-ago.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SignupComponent } from './public/signup/signup.component';
import { LoginComponent } from './public/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';

import { NgToastModule } from 'ng-angular-popup';
import {ExcerptFilter} from './public/pipes/excerpt.pipe';

import { SingleCommentComponent } from './public/single-comment/single-comment.component';
import { JwtHelperService } from '@auth0/angular-jwt';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovieDetailComponent,
    HomeComponent,
    PagenotfoundComponent,
    DateAgoPipe,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    ExcerptFilter,
    SingleCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    NgToastModule,
   
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
