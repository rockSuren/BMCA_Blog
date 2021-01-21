import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http : HttpClient) { }

  fetchBlogList() : Observable<any>{       
    return this.http.get('http://localhost:3000/fetchBlog');
   }
   saveBlog(blog : any) : Observable<any> {
     return this.http.post('http://localhost:3000/insertBlog',blog);
   }
   updateBlog(blog : any) :  Observable<any> {
    return this.http.post('http://localhost:3000/updateBlog',blog);
  }
  deleteBlog(blogId : number) :  Observable<any> {
    return this.http.get('http://localhost:3000/deleteBlog?blogId='+blogId);
  }
}