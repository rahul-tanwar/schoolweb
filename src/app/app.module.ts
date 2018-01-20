import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { NgModule } from '@angular/core';
<<<<<<< Updated upstream
import { DashboardModule } from './dashboard/dashboard.module';
=======
import { RouterModule, Routes } from '@angular/router';
>>>>>>> Stashed changes
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
<<<<<<< Updated upstream


=======
import { DashboardComponent } from './dashboard/dashboard.component';
import { routing } from './app.routing';
 
>>>>>>> Stashed changes
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< Updated upstream
    DashboardModule
=======
    FormsModule,
    routing
>>>>>>> Stashed changes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
