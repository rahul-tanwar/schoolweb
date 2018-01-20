import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { NgModule } from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { routing } from './app.routing';
import { SchoolInfoComponent } from './account/school-info/school-info.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    SchoolInfoComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
