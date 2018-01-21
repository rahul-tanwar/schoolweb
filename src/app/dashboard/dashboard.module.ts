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
  ],
  imports: [
    BrowserModule,
    DashboardRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  exports:[DashboardComponent],
  providers: []
})
export class DashboardModule { }
