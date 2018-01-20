import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { SchoolInfoComponent } from "./account/school-info/school-info.component";
import { DashboardComponent } from "./dashboard/dashboard.component";




const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'school-info', component: SchoolInfoComponent },

    {path:'dashboard',component:DashboardComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

  
  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule { }