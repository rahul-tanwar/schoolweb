// import { Routes, RouterModule } from '@angular/router';
// import { NgModule } from '@angular/core';
// import { LoginComponent } from '../account/login/login.component';
// import { SignupComponent } from '../account/signup/signup.component';
// import { ForgotPasswordComponent } from '../account/forgot-password/forgot-password.component';
// import { SchoolInfoComponent } from '../account/school-info/school-info.component';
// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { DashboardMainComponent } from '../dashboard/dashboard-main/dashboard-main.component';
// import { ClassComponent } from '../dashboard/class/class.component';
// import { ParentComponent } from '../dashboard/parent/parent.component';
// import { StaffComponent } from '../dashboard/staff/staff.component';
// import { CalenderComponent } from '../dashboard/calender/calender.component';
// import { StudentComponent } from '../dashboard/student/student.component';
// import { ReportComponent } from '../dashboard/report/report.component';
// import { SchoolComponent } from '../dashboard/school/school.component';
// import { StudentDetailsComponent } from '../dashboard/student/student-details/student-details.component';
// import { StaffDetailsComponent } from '../dashboard/staff/staff-details/staff-details.component';
// import { ClassDetailsComponent } from '../dashboard/class/class-details/class-details.component';

// import { SchoolDetailsComponent } from '../dashboard/school/school-details/school-details.component';
// import { AuthGuardService } from '../shared/service/authguard/auth.guard.service';


// const dashboardRoutes: Routes = [

//     {
//         path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService],
//         children: [
//             { path: '', redirectTo: 'dashboardmain', pathMatch: 'full' },
//             { path: 'dashboardmain', component: DashboardMainComponent },
//             { path: 'class', component: ClassComponent },
//             { path: 'parent', component: ParentComponent },
//             { path: 'staff', component: StaffComponent },
//             { path: 'staff-details/:id', component: StaffDetailsComponent },
//             { path: 'callender', component: CalenderComponent },
//             { path: 'student-list', component: StudentComponent },
//             { path: 'student-details/:id', component: StudentDetailsComponent },
//             { path: 'report', component: ReportComponent },
//             { path: 'school', component: SchoolComponent },
//             { path: 'class-details/:id', component: ClassDetailsComponent },
//             { path: 'school-details/:id', component: SchoolDetailsComponent },
//         ]
//     }
// ];

// @NgModule({
//     imports: [
//         RouterModule.forChild(dashboardRoutes)
//     ],
//     exports: [
//         dashboardRoutes
//     ]
// })
// export class DashboardRoutingModule { }
