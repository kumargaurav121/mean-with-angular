import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8)])
    })

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
          this.router.navigate(['/dashboard']);
        }, 2000);
      }
    });


  }

}
