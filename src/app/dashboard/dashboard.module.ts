import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { SchoolComponent } from './school/school.component';
import { StudentComponent } from './student/student.component';
import { ClassComponent } from './class/class.component';
import { ParentComponent } from './parent/parent.component';
import { CalenderComponent } from './calender/calender.component';
import { StaffComponent } from './staff/staff.component';
import { ReportComponent } from './report/report.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardRoutingModule } from "./dashboard-routing";
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ParentDetailsComponent } from './parent/parent-details/parent-details.component';
import {AddParentComponent  } from "./parent/add-parent/add-parent.component";
import {MatDialogModule} from '@angular/material/dialog';

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
    ReportComponent,
    DashboardMainComponent,
    StudentDetailsComponent,
    ParentDetailsComponent,
    AddParentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule
  ],
  exports:[DashboardComponent],
  providers: []
})
export class DashboardModule { }
