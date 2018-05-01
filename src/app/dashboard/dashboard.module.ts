import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
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
import { DashboardRoutingModule } from './dashboard-routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { ParentDetailsComponent } from './student/parent-details/parent-details.component';
import { AddParentComponent } from './parent/add-parent/add-parent.component';
import { StudentActivityComponent } from './student/student-activity/student-activity.component';
//import { SpinnerComponent } from './../shared/component/spinner/spinner.component';
import { MultimediaComponent } from './../shared/component/multimedia/multimedia.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { AddStaffComponent } from './staff/add-staff/add-staff.component';
import { AddClassComponent } from './class/add-class/add-class.component';
import { ClassDetailsComponent } from './class/class-details/class-details.component';
import { ClassStudentsComponent } from './class/class-students/class-students.component';
import { GenerateStudentAppCodeComponent } from './student/generate-student-app-code/generate-student-app-code.component';
import { SchoolInfoComponent } from './school/school-info/school-info.component';
import { StaffDetailsComponent } from './staff/staff-details/staff-details.component';
import { StaffOtherInfoComponent } from './staff/staff-other-info/staff-other-info.component';
import { SchoolDetailsComponent } from './school/school-details/school-details.component';
import { SchoolOtherInfoComponent } from './school/school-other-info/school-other-info.component';
import { SchoolAdminComponent } from './school/school-admin/school-admin.component';
import { SchoolSettingsComponent } from './school/school-settings/school-settings.component';
import { SettingStaffComponent } from './staff/setting-staff/setting-staff.component';
import { DocumentStaffComponent } from './staff/document-staff/document-staff.component';
import { AddDocumentComponent } from './staff/document-staff/add-document/add-document.component';
import { StudentListComponent } from './class/student-list/student-list.component';
import { AddStudentClassComponent } from './class/add-student-class/add-student-class.component';
import { ParentListComponent } from './parent/parent-list/parent-list.component';
import { HeaderComponent } from './header/header.component';
import { ExperienceCertificateInfoComponent } from './staff/experience-certificate-info/experience-certificate-info.component';
import { AddSchoolComponent } from './school/add-school/add-school.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { ClassParentsComponent } from './class/class-parents/class-parents.component';
import { StaffInfoComponent } from './staff/staff-info/staff-info.component';
import {
    AddCertificateExperienceComponent
} from './staff/experience-certificate-info/add-certificate-experience/add-certificate-experience.component';


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
        ClassDetailsComponent,
        GenerateStudentAppCodeComponent,
        SchoolInfoComponent,
        StaffDetailsComponent,
        SchoolDetailsComponent,
        SchoolOtherInfoComponent,
        SchoolAdminComponent,
        SchoolSettingsComponent,
        StaffOtherInfoComponent,
        SettingStaffComponent,
        DocumentStaffComponent,
        AddDocumentComponent,
        StudentListComponent,
        AddStudentClassComponent,
        ParentListComponent,
        HeaderComponent,
        ExperienceCertificateInfoComponent,
        AddSchoolComponent,
        ClassStudentsComponent,
        AddStudentComponent,
        ClassParentsComponent,
        StaffInfoComponent,
        MultimediaComponent,
        AddCertificateExperienceComponent
    ],
    entryComponents: [
        AddParentComponent,
        StudentProfileComponent,
        AddStaffComponent,
        AddClassComponent,
        AddDocumentComponent,
        StudentListComponent,
        AddStudentClassComponent,
        AddSchoolComponent,
        AddStudentComponent,
        AddCertificateExperienceComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        MaterialModule,
        FormsModule
    ],
    exports: [DashboardComponent],
    providers: []
})
export class DashboardModule { }
