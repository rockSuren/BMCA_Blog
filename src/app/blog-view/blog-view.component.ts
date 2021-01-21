import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogVO } from '../models/blogVO';
import { BlogService } from '../service/blog.service';
@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {
  panelOpenState : boolean = false;
  showBlogCreate : boolean = false;
  constructor(private route : Router, private blogSrv : BlogService) { }
  blogDetails: BlogVO[];
  selectedBlog : BlogVO;
  ngOnInit(): void {
  }
  openCreateBlog(){
    this.showBlogCreate = !this.showBlogCreate;
  }
  editBlog(blog : BlogVO){
    this.selectedBlog = blog;
  }
  deleteBlog(blog : BlogVO){
    this.blogSrv.deleteBlog(blog.blogId).
    subscribe(result => {
      if(result && result.deleted){
          //success pop-up
      }
      else {
        this.route.navigate(['/error']);
      }
    },
    errror => {
      this.route.navigate(['/error']);
    })
  }
  addLike(){
    
  }
  fetchBlogList() {
    this.blogSrv.fetchBlogList().
    subscribe(result => {
      if(result && result.length > 0){
        this.blogDetails = result;
      }
      else {
        this.route.navigate(['/error']);
      }
    },error => {
      this.route.navigate(['/error']);
    })
  }
}