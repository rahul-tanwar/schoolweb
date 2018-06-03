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
    public isParentAvailable = false;

    constructor(private injector: Injector,
        private router: Router) { super(injector); }

    ngOnInit() {
        this.getStudent();
        this.subscribeStudentPatentsData();
    }

    getStudent(): void {
        this.services.studentService.getStudentById(this.studentId).subscribe((result) => {
            if (!!result) {
                this.studentAppCode.StudentId = result.StudentId;
                this.studentAppCode.StudentUniqueId = result.StudentUniqueId;
                this.studentAppCode.AppCode = result.AppCode;
            }
        });
    }

    private subscribeStudentPatentsData(): void {
        this.services.studentService.getParentsByStudentId(this.studentId);
        this.services.studentService.parentData.subscribe((result) => {
            if (!!result && result.length > 0) {
                this.isParentAvailable = true;
            }
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

    public mailAppCodeToParents(): void {
        this.services.studentService.sendAppCodeMailToParent(this.studentId as any).subscribe((result) => {
            if (result) {
                this.services.notificationService.show('Sent successfully');
            }
        });
    }

    public cancel(): void {
        this.router.navigateByUrl('/dashboard/student');
    }

    print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('studentprofileform').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
              <title>Print tab</title>
            </head>
        <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }


}
