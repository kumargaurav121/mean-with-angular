import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid = true;
  emailMessage;
  usernameValid = true;
  usernameMessage;

  createForm(){
    this.myForm = this.formBuilder.group({
      email: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      confirm: ["", Validators.required]
    }, {validator: this.matchPassword('password', 'confirm')});
  }

  constructor( 
   private formBuilder: FormBuilder,
   private authService: AuthService,
   private router : Router
  ) {
    this.createForm();
   }


   onRegisterSubmit() {

    this.processing = true;
    this.disableForm();

    const user = {
      email: this.myForm.get('email').value,
      username: this.myForm.get('username').value,
      password: this.myForm.get('password').value
    }
    //  console.log(this.myForm.get('email').value);
    //  console.log(this.myForm.get('username').value);
    //  console.log(this.myForm.get('password').value);

    this.authService.registerUser(user).subscribe(data => {
      //console.log(data);
      if(!data.success){
        this.processing = false;
        this.enableForm();
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
        //this.router.navigate(['/login']);
      }
    });

   }


   checkEmail(){

    this.authService.checkEmail(this.myForm.controls['email'].value).subscribe(data => {
      if(!data.success){
        this.emailValid = false;
        this.emailMessage = data.message;
      } else{
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    })
   }



   checkUsername(){

    this.authService.checkUsername(this.myForm.controls['username'].value).subscribe(data => {
      if(!data.success){
        this.usernameValid = false;
        this.usernameMessage = data.message;
      } else{
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    })
   }


   disableForm(){
    this.myForm.controls['email'].disable();
    this.myForm.controls['username'].disable();
    this.myForm.controls['password'].disable();
    this.myForm.controls['confirm'].disable();
   }


   enableForm(){
    this.myForm.controls['email'].enable();
    this.myForm.controls['username'].enable();
    this.myForm.controls['password'].enable();
    this.myForm.controls['confirm'].enable();
   }


   matchPassword(pass, confirm){

      return (group: FormGroup) => {
        if(group.controls[pass].value === group.controls[confirm].value){
          return null;
        } else{
          return {'matchPassword': true};
        }
      }

   }




  ngOnInit() {
  }

}
