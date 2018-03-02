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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { ParentDetailsComponent} from './parent/parent-details/parent-details.component';
import {AddParentComponent  } from "./parent/add-parent/add-parent.component";
import { StudentActivityComponent } from './student/student-activity/student-activity.component';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule
} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { AddStaffComponent } from './staff/add-staff/add-staff.component';
import { AddClassComponent } from './class/add-class/add-class.component';
import { GenerateStudentAppCodeComponent } from './student/generate-student-app-code/generate-student-app-code.component';
/**
 * NgModule that includes all Material modules that are required to serve 
 * the Plunker.
 */
@NgModule({
  exports: [
   
    MatNativeDateModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
 ]
})
export class MaterialModule {}

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
    AddParentComponent,
    StudentActivityComponent,
    StudentProfileComponent,
    AddStaffComponent,
    AddClassComponent,
    GenerateStudentAppCodeComponent,
  ],
  entryComponents: [
    AddParentComponent,
    StudentProfileComponent,
    AddStaffComponent,
    AddClassComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule
    
  ],
  exports:[DashboardComponent],
  providers: []
})
export class DashboardModule { }
