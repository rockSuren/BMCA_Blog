import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { BlogVO } from '../models/blogVO';
import { BlogService } from '../service/blog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {
  userForm = new FormGroup({
    title : new FormControl('',[Validators.required]),
    file : new FormControl('',[Validators.required]),
    description : new FormControl('',[Validators.required])
  });
  imageSrc: string;
  @Input() selectedBlog : BlogVO;
  @Input() showBlogCreate : boolean;
  editedBlog : BlogVO;
  constructor(private route : Router, private blogSrv : BlogService) { }

  ngOnInit(): void {
    if(this.showBlogCreate){
      this.userForm = new FormGroup({
        title : new FormControl(this.selectedBlog.blogTitle,[Validators.required]),
        file : new FormControl(this.selectedBlog.blogImage,[Validators.required]),
        description : new FormControl(this.selectedBlog.blogDesc,[Validators.required])
      });
    }
  }
  submitBlog(){
  
    this.editedBlog.blogTitle = this.userForm.get('title').value;
    this.editedBlog.blogImage = this.userForm.get('file').value;
    this.editedBlog.blogDesc = this.userForm.get('description').value;
    if(this.showBlogCreate){
      this.editedBlog.blogId = this.selectedBlog.blogId;
        this.blogSrv.updateBlog(this.editedBlog).
        subscribe(result => {
          if(result && result.updated){
              //success pop-up
          }
          else {
            this.route.navigate(['/error']);
          }
        }, error => {
          this.route.navigate(['/error']);
        });
    }
    else {
      this.blogSrv.saveBlog(this.editedBlog).
      subscribe(result => {
        if(result && result.inserted){
            //success pop-up
        }
        else {
          this.route.navigate(['/error']);
        }
      }, error => {
        this.route.navigate(['/error']);
      });
    }
    
  }
  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.userForm.patchValue({
          file: reader.result
        });
   
      };
   
    }
  }
}