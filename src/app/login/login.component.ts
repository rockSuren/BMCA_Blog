import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName : new FormControl('',[Validators.required]),
    passowrd : new FormControl('',[Validators.required])
  });
  constructor(private loginSrv : LoginService,private route : Router) { }
  hide = true;
  ngOnInit(): void {
  }
  doLogin(){
    this.loginSrv.validateLogin(this.loginForm.get('userName').value,this.loginForm.get('passowrd').value).
    subscribe(result => {
      if(result.user && result.userInd === 1){
        this.route.navigate(['/admin']);
      }
      else if(result.user && result.userInd === 2){
        this.route.navigate(['/user']);
      }
      else {
        this.route.navigate(['/error']);
      }
    },error => {
        this.route.navigate(['/error']);
    });
  }
}