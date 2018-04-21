import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../../shared/service/student/student.service';
import { Student, StudentAppCode } from '../../../shared/model/student';

@Component({
    selector: 'app-generate-student-app-code',
    templateUrl: './generate-student-app-code.component.html',
    styleUrls: ['./generate-student-app-code.component.css']
})
export class GenerateStudentAppCodeComponent implements OnInit {
    @Input() studentId: number;
    public studentAppCode = new StudentAppCode();

    constructor(public studentService: StudentService) { }

    ngOnInit() {
        this.getStudent();
    }

    getStudent(): void {
        this.studentService.getStudentById(this.studentId).subscribe((result) => {
            this.studentAppCode.StudentId = result.StudentId;
            this.studentAppCode.StudentUniqueId = result.StudentUniqueId;
        });
    }

    public generateAppCode(): void {
        debugger;
        this.studentAppCode.AppCode = Math.random().toString(36).substring(2);
        this.studentService.updateAppCode(this.studentAppCode).subscribe((result) => {
            if (!!result) {
                alert('success');
            }
        });
    }



}
