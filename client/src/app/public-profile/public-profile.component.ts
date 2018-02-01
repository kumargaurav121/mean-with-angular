import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  username;
  user;
  message;
  messageClass;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.username = this.activatedRoute.snapshot.params.username;
    this.publicProfile(this.username);

  }

  publicProfile(username){
    this.authService.publicProfile(username).subscribe(data => {
      if(!data.success){
        this.message = data.message;
        this.messageClass = 'alert alert-danger';
      } else{
        this.user = data.user;
      }
    })
  }

}
