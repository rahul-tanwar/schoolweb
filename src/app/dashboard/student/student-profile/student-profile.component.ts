import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../../shared/service/student/student.service';
import { Student } from '../../../shared/model/student';
import { Class } from '../../../shared/model/class';
import { ClassService } from '../../../shared/service/class/class.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

    @Input() studentId: number;
    public student = new Student();
    public classList: Array<Class>;

    constructor(public studentService: StudentService,
        public classService: ClassService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getStudent();
        this.subscribeClassData();
        this.classService.getAllClasses();
    }

    private subscribeClassData(): void {
        this.classService.classData.subscribe((result: Array<Class>) => {
            this.classList = result;
        });
    }

    getStudent(): void {
        this.studentService.getStudentById(this.studentId).subscribe((result) => {
            this.student = result;
        });
    }

    public save(): void {
        this.studentService.saveStudent(this.student).subscribe((result) => {
            this.studentService.getStudentsBySchoolId();
            alert('successfully saved');
        });
    }

    public cancel(): void {
        this.router.navigateByUrl('/dashboard/student-list');
    }


}
