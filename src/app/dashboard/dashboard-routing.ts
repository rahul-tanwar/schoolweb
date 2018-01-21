import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { ClassComponent } from './class/class.component';
import { ParentComponent } from './parent/parent.component';
import { StaffComponent } from './staff/staff.component';
import { CalenderComponent } from './calender/calender.component';
import { StudentComponent } from './student/student.component';
import { ReportComponent } from "./report/report.component";
import { SchoolComponent } from "./school/school.component";
import { DashboardMainComponent } from "./dashboard-main/dashboard-main.component";
import { DashboardComponent } from './dashboard.component';



 const dashboardRoutes: Routes = [
        { path: 'dashboard', redirectTo:'/dashboardmain',pathMatch:'full'},
        { path: 'dashboardmain', component:DashboardMainComponent },
        { path: 'class', component: ClassComponent },
        { path: 'parent', component: ParentComponent },
        { path: 'staff', component: StaffComponent },
        { path: 'callender', component: CalenderComponent },
        { path: 'student', component:StudentComponent },
        { path: 'report', component: ReportComponent },
        { path: 'school', component:SchoolComponent }  
];

@NgModule({
    imports: [
      RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class DashboardRoutingModule { }