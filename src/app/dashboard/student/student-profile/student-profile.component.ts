import { Component, OnInit, Input, Injector } from '@angular/core';
import { StudentService } from '../../../shared/service/student/student.service';
import { Student } from '../../../shared/model/student';
import { Class } from '../../../shared/model/class';
import { ClassService } from '../../../shared/service/class/class.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent extends BaseComponent implements OnInit {

    @Input() studentId: number;
    public student = new Student();
    public classList: Array<Class>;

    constructor(public studentService: StudentService,
        private injector: Injector,
        private router: Router
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getStudent();
        this.subscribeClassData();
        this.services.classService.getAllClasses();
    }

    private subscribeClassData(): void {
        this.services.classService.classData.subscribe((result: Array<Class>) => {
            this.classList = result;
        });
    }

    getStudent(): void {
        this.studentService.getStudentById(this.studentId).subscribe((result) => {
            this.student = result;
            this.services.stateMachineService.setBreadCrumb.next('Student / ' + this.student.Name);
        });
    }

    public save(): void {
        this.services.spinnerService.show();
        this.studentService.saveStudent(this.student).subscribe((result) => {
            this.studentService.getStudentsBySchoolId();
            this.services.spinnerService.hide();
            this.services.notificationService.show('Successfully Saved.');
        });
    }

    public cancel(): void {
        this.router.navigateByUrl('/dashboard/student');
    }
}
