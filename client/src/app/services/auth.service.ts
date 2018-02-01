import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {

  domain = 'http://localhost:3000';
  user;
  authToken;
  options;

  constructor(
    private http: Http
  ) { }


  loadToken(){
    this.authToken = localStorage.getItem('token');
  }



  createAuthenticationHeader(){
    this.loadToken();

    this.options = new RequestOptions({
      headers : new Headers({
        'Content-Type': 'application/json',
        'x-auth': this.authToken
      })
    });
  }

  registerUser(user){
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
  }


  checkEmail(email){
    return this.http.get(this.domain + '/authentication/checkEmail/' + email).map(res => res.json());
  }

  checkUsername(username){
    return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res.json());
  }

  login(user){
    return this.http.post(this.domain + '/authentication/login', user).map(res => res.json());
  }

  logout(){
    this.user = null;
    this.authToken = null;
    localStorage.clear();
  }


  storeUserData(user, token){
    localStorage.setItem('token', token);
    localStorage.setItem(user, JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  getProfile(){
    this.createAuthenticationHeader();
    return this.http.get(this.domain + '/authentication/profile', this.options).map(res => res.json());
  }


  loggedIn() {
    return tokenNotExpired();
  }

  publicProfile(username){
    this.createAuthenticationHeader();
    return this.http.get(this.domain + '/authentication/public-profile/' + username, this.options).map(res => res.json());
  }

}
