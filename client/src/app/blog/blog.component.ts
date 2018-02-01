import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  messageClass;
  message;
  newPost = false;
  loadingBlogs = false;
  blogForm: FormGroup;
  processing = false;
  username;
  blogs = [];

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit() {

    this.blogForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'body': new FormControl(null, [Validators.required, Validators.minLength(10)])
    });

    this.authService.getProfile().subscribe(data => {
      //console.log(data);
      if(!data.success){
        this.authService.logout();
        this.router.navigate(['/login']);
      } else{
        this.username = data.user.username;
        //console.log('data',this.username);
        this.getAllBlogs();
      }
    });

    
  }


  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe(data => {
      // this.message = JSON.stringify(data, undefined, 2);
      // this.messageClass = 'alert alert-danger';

      if(!data.success){
        this.message = 'No Blog Found';
        this.messageClass = 'alert alert-danger';
      } else{
        this.blogs = data.blogs;
      }
    });
  }


  newBlogForm(){
    this.newPost = true;
  }

  loadBlogs(){
    this.loadingBlogs = true;
    this.getAllBlogs();
    setTimeout(() => {
      this.loadingBlogs = false;
    }, 4000);
  }

  enableForm(){
    this.blogForm.controls['title'].enable();
    this.blogForm.controls['body'].enable();
  }

  disableForm(){
    this.blogForm.controls['title'].disable();
    this.blogForm.controls['body'].disable();
  }



  goBack(){
    this.newPost = false;
  }


  blogSubmit(){
    this.processing = true;
    this.disableForm();

    

    const blog = {
      title: this.blogForm.controls['title'].value,
      body: this.blogForm.controls['body'].value,
      createdBy: this.username
    }

    //console.log('blog:', blog)

    this.blogService.storeBlog(blog).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.enableForm();
        this.processing = false;
      } else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() =>{
          //this.router.navigate(['/blog']);
          this.enableForm();
          this.processing = false;
          this.getAllBlogs();
          this.newPost = false;
          this.blogForm.reset();
          this.message = null;
          this.messageClass = null;
          this.enableForm();
          
        }, 2000);
      }
    });
  }




  likeBlog(id){
    console.log(id)

    this.blogService.likeBlog(id).subscribe(data => {
      console.log(data);
      this.getAllBlogs();
    })
  }


  dislikeBlog(id){
    console.log(id)

    this.blogService.dislikeBlog(id).subscribe(data => {
      console.log(data);
      this.getAllBlogs();
    })
  }

}
