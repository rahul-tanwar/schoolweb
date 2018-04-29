import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentService } from '../../../shared/service/student/student.service';
import { Student } from '../../../shared/model/student';
import { Class } from '../../../shared/model/class';
import { ClassService } from '../../../shared/service/class/class.service';

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

    public student = new Student();
    public classList: Array<Class>;

    constructor(public dialogRef: MatDialogRef<AddStudentComponent>,
        private studentService: StudentService,
        private classService: ClassService
    ) { }

    ngOnInit() {
        this.subscribeClassData();
    }

    private subscribeClassData(): void {
        this.classService.classData.subscribe((result: Array<Class>) => {
            this.classList = result;
        });
    }

    public save(): void {
        this.studentService.saveStudent(this.student).subscribe((result) => {
            this.studentService.getStudentsBySchoolId();
            this.dialogRef.close('successfully');
            alert('successfully save');
        });
    }

    public cancel(): void {
        this.dialogRef.close();
    }

}
