import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BlogService {

  domain = 'http://localhost:3000';

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  // createAuthenticationHeader(){
  //   this.authService.loadToken();

  //   this.authService.options = new RequestOptions({
  //     headers : new Headers({
  //       'Content-Type': 'application/json',
  //       'x-auth': this.authService.authToken
  //     })
  //   });
  // }

  storeBlog(blog){
    //console.log(blog);
    this.authService.createAuthenticationHeader();
    return this.http.post(this.domain + '/blogs/newBlog', blog, this.authService.options).map(res => res.json());
  }


  getAllBlogs(){
    this.authService.createAuthenticationHeader();
    return this.http.get(this.domain + '/blogs/viewAll', this.authService.options).map(res => res.json());
  }

}
