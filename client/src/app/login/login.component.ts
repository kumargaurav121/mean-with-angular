import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.gaurd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  messageClass;
  message;
  processing = false;
  previousUrl;

  constructor(
    private authService : AuthService,
    private router : Router,
    private authGuard: AuthGuard
  ) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    if(this.authGuard.redirectUrl){
      this.message = 'You Must be Logged In to Visit This Page';
      this.messageClass = 'alert alert-info';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }

  }

  enableForm(){
    this.loginForm.controls['username'].enable();
    this.loginForm.controls['password'].enable();
  }

  disableForm(){
    this.loginForm.controls['username'].disable();
    this.loginForm.controls['password'].disable();
  }


  onLogin(){
    // var username = this.loginForm.get('username').value;
    // console.log('Submit', username);
    // console.log('username' + username);

    this.disableForm();
    this.processing = true;

    const user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }

    this.authService.login(user).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.enableForm();
        this.processing = false;
      } else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.user, data.token);
        setTimeout(() =>{

          if(this.previousUrl){
            this.router.navigate([this.previousUrl]);
          } else{
            this.router.navigate(['/dashboard']);
          }
        }, 2000);
      }
    });


  }

}
