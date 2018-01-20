import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { SchoolInfoComponent } from "./account/school-info/school-info.component";
const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'school-info', component: SchoolInfoComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);