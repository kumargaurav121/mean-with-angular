import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css']
})
export class DeleteBlogComponent implements OnInit {

  blog;
  currentUrl;
  message;
  messageClass;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.currentUrl = this.activatedRoute.snapshot.params;

    this.blogService.editBlog(this.currentUrl.id).subscribe(data => {
      if(!data.success){
        this.message = data.message;
        this.messageClass = 'alert alert-danger';
      } else{
        this.blog = data.blog;
      }
    })
  }


  deleteBlog(){
    this.blogService.deleteBlog(this.blog._id).subscribe(data => {
      if(!data.success){
        this.message = data.message;
        this.messageClass = 'alert alert-danger';
      } else{
        this.message = data.message;
        this.messageClass = 'alert alert-success';
        setTimeout(() => {
          this.router.navigate(['/blog']);
        }, 2000);
      }
    })
  }

}
