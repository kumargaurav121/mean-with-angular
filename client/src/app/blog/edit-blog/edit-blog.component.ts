import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blog;
  currentUrl;
  message;
  messageClass;
  processing = false;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {

    this.currentUrl = this.activatedRoute.snapshot.params;
    //console.log(this.currentUrl);

    this.blogService.editBlog(this.currentUrl.id).subscribe(data => {
      //console.log(data);
      this.blog = data.blog;
      
    });

  }



  updateBlog(){
    this.processing = true;

    this.blogService.updateBlog(this.blog).subscribe(data => {
      if(!data.success){
        this.message = data.message;
        this.messageClass = 'alert alert-danger';
        this.processing = false;
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
