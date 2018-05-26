import { Component, OnInit, Input, Injector } from '@angular/core';
import { StudentService } from '../../../shared/service/student/student.service';
import { Student, StudentAppCode } from '../../../shared/model/student';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
@Component({
    selector: 'app-generate-student-app-code',
    templateUrl: './generate-student-app-code.component.html',
    styleUrls: ['./generate-student-app-code.component.css']
})
export class GenerateStudentAppCodeComponent extends BaseComponent implements OnInit {
    @Input() studentId: number;
    public studentAppCode = new StudentAppCode();

    constructor(private injector: Injector,
        private router: Router) { super(injector); }

    ngOnInit() {
        this.getStudent();
    }

    getStudent(): void {
        this.services.studentService.getStudentById(this.studentId).subscribe((result) => {
            this.studentAppCode.StudentId = result.StudentId;
            this.studentAppCode.StudentUniqueId = result.StudentUniqueId;
        });
    }

    public generateAppCode(): void {
        this.services.spinnerService.show();
        this.studentAppCode.AppCode = Math.random().toString(36).substring(2);
        this.services.studentService.updateAppCode(this.studentAppCode).subscribe((result) => {
            if (!!result) {
                this.services.notificationService.show('Success.');
            }

            this.services.spinnerService.hide();
        });
    }
    public cancel(): void {
        this.router.navigateByUrl('/dashboard/student');
    }


}
