import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , Subscription , of} from 'rxjs';
import { Apollo } from 'apollo-angular';
import { CreateUserInput, LoginUserInput, UpdateUserInput } from '../generated/graphql';
import { SIGNUP_MUTATION, LOGIN_MUTATION, UPDATE_USER, GET_USER } from '../graphql';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private apollo: Apollo,
    private toast: NgToastService,
    private router: Router,
   
  ) {
    
    if (localStorage.getItem("token")) this._isAuthenticated.next(true);
    else this._isAuthenticated.next(false);
  }

  get isAuthenticated(): Observable<boolean> {
      return this._isAuthenticated.asObservable();
  }


  CreateUser(data: CreateUserInput) {
    this.apollo
      .mutate({
        mutation: SIGNUP_MUTATION,
        variables: {
          data,
        },
      })
      .subscribe({
        next: (data: any) => {
          this.toast.success({
            detail: 'Success Message',
            summary: 'signup succesful',
          });
        },
        error: (error) => {
          this.toast.error({ detail: 'Info ', summary: error });
          console.log('there was an error sending the query', error);
        },
      });
  }

  login(data: LoginUserInput) {
    this.apollo
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: { data },
      })
      .subscribe({
        next: (data: any) => {
          this._isAuthenticated.next(true);
          localStorage.setItem('token', data?.data.login.token);
          localStorage.setItem('User_Id', data?.data.login.user.id);
          //localStorage.setItem('Role', data?.data.login.user.role);
          this.toast.success({
            detail: 'Welcome back',
            summary: `${data?.data.login.user.username}`,
          });
            this.router.navigate(['/home']);
        },
        error: (error) => {
          this.toast.error({ detail: 'Error', summary: error });
          console.log('Error', error);
        },

      });
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("User_Id");
    //localStorage.removeItem("Role");
    this._isAuthenticated.next(false);
    window.location.href = "/";
    // rest store 
    this.apollo.client.resetStore();
  }

    
  updateProfile(data: UpdateUserInput) {

    this.apollo
    .mutate({
      mutation: UPDATE_USER,
      refetchQueries: [{query: GET_USER}],
      variables:{ data },   
    })
    .subscribe(
      {
        next:(data: any) => { 
          this.toast.success({
            detail: 'Success Message',
            summary: 'profile updated succesful',
          });
      }, 
      
      error: error => {
        this.toast.error({ detail: 'Error', summary: 'email taken' });   
      }  
    });  
  }

}
