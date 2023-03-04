import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from'../../services/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  showAlert : boolean = false 

  name: string = '';
  username: string = '';
  email: string = '';
  password: string = ''; 

  constructor(private authService: AuthService ) {


  }


  onSubmit( signupForm:NgForm) {
   const data = {
    name:this.name,
    username: this.username,
    email: this.email,
    password:this.password
  
   }

     if (signupForm.valid ) {
    this.authService.CreateUser(data)
      signupForm.resetForm()
   } 
  }  
}

  
