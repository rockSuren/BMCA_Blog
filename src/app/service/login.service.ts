import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
isAdminUser : number = 0;
isUser : number = 0;
  constructor(private http : HttpClient) { }

  validateLogin(userName: string, password: string) : Observable<any>{       
   return this.http.get('http://localhost:3000/fetchBlog?userName='+userName+'& password='+password);
  }
}