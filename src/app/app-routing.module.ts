import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
const routes: Routes = [
  {
    path:'',
    component : LoginComponent
  },  
  {
    path : 'admin',
    component : AdminComponent
  },
  {
    path : 'user',
    component : BlogViewComponent
  },
  {
    path:'**',
    component : ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
