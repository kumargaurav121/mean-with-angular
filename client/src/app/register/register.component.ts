import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  createForm(){
    this.myForm = this.formBuilder.group({
      email: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      confirm: ["", Validators.required]
    }, {validator: this.matchPassword('password', 'confirm')});
  }

  constructor( 
   private formBuilder: FormBuilder
  ) {
    this.createForm();
   }


   onRegisterSubmit() {
     console.log('form submitted');
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
