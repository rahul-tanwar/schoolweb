import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolInfoComponent } from './account/school-info/school-info.component';
import { AppRoutingModule } from './app.routing';
import * as ServiceAPI from './shared/school-api';
import * as Service from './shared/service';
import { SpinnerComponent } from '../app/shared/component/spinner/spinner.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        ForgotPasswordComponent,
        SchoolInfoComponent,
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        DashboardModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule
    ],
    providers: [
        // ServiceAPI.BaseServiceApi,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Service.SchoolInterceptor,
            multi: true
        },
        ServiceAPI.SchoolServiceApi,
        ServiceAPI.ClassServiceApi,
        ServiceAPI.UserServiceApi,
        ServiceAPI.StudentApiService,
        ServiceAPI.ClassServiceApi,
        ServiceAPI.StaffApiService,
        ServiceAPI.ActivityApiService,
        Service.AuthGuardService,
        Service.SchoolService,
        Service.UserService,
        Service.ClassService,
        Service.StudentService,
        Service.SpinnerService,
        Service.NotificationService,
        Service.StaffService,
        Service.StateMachineService,
        Service.ActivityService,
        Service.ConfirmService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
