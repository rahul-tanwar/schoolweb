import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentService } from '../../../shared/service/student/student.service';
import { Student } from '../../../shared/model/student';
import { Class } from '../../../shared/model/class';
import { ClassService } from '../../../shared/service/class/class.service';
import { BaseComponent } from '../../base/base.component';
@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent extends BaseComponent implements OnInit {

    public student = new Student();
    public classList: Array<Class>;

    constructor(public dialogRef: MatDialogRef<AddStudentComponent>,
        private injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
        this.subscribeClassData();
    }

    private subscribeClassData(): void {
        this.services.classService.classData.subscribe((result: Array<Class>) => {
            this.classList = result;
        });
    }

    public save(): void {
        this.services.spinnerService.show();
        this.services.studentService.saveStudent(this.student).subscribe((result) => {
            this.services.studentService.getStudentsBySchoolId();
            this.dialogRef.close('successfully');
            this.services.spinnerService.hide();
            this.services.notificationService.show('Successfully Saved.');
        });
    }

    public cancel(): void {
        this.dialogRef.close();
    }

}
