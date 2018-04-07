import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolInfoComponent } from './account/school-info/school-info.component';
import { AppRoutingModule } from './app.routing';
import * as ServiceAPI from './shared/school-api';
import * as Service from './shared/service';


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
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        ServiceAPI.BaseServiceApi,
        ServiceAPI.SchoolServiceApi,
        Service.SchoolService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
