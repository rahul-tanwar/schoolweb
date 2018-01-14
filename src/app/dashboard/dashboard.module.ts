import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { SchoolComponent } from './school/school.component';
import { StudentComponent } from './student/student.component';
import { ClassComponent } from './class/class.component';
import { ParentComponent } from './parent/parent.component';
import { CalenderComponent } from './calender/calender.component';
import { StaffComponent } from './staff/staff.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarNavComponent,
    SchoolComponent,
    StudentComponent,
    ClassComponent,
    ParentComponent,
    CalenderComponent,
    StaffComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule
  ],
  exports:[DashboardComponent],
  providers: []
})
export class DashboardModule { }
