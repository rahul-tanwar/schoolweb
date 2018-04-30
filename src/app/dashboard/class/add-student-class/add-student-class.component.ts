import { OnInit, Inject, Injector } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ClassService } from '../../../shared/service/class/class.service';
import { StudentService } from '../../../shared/service/student/student.service';
import { Student } from '../../../shared/model/student';
import { StudentClassModel } from '../../../shared/model/class';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'app-add-student-class',
    templateUrl: './add-student-class.component.html',
    styleUrls: ['./add-student-class.component.css']
})
export class AddStudentClassComponent extends BaseComponent implements OnInit {
    studentList: Array<Student>;
    displayedColumns = ['select', 'name'];
    dataSource: MatTableDataSource<Student>;
    selection = new SelectionModel<Student>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AddStudentClassComponent>,
        private injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
        //   this.services.spinnerService.show();
        this.subscribeStudentData();
        this.services.studentService.getStudentsBySchoolId();
    }

    private subscribeStudentData(): void {

        this.services.studentService.studentData.subscribe((result) => {
            if (!!result) {
                this.dataSource = new MatTableDataSource<Student>(result.reverse());
                this.dataSource.paginator = this.paginator;
                this.studentList = result;
            }

            this.services.spinnerService.hide();
            //  this.changeDetectorRef.detectChanges();
            //  this.changeDetectorRef.markForCheck();
        });


    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    public addStudents(): void {
        const studentList = this.studentList.filter((item: Student) => item.isSelected === true);
        if (!!studentList) {
            this.services.spinnerService.show();
            const obj = new StudentClassModel();
            obj.ClassId = this.data.classId;
            obj.StudentIds = studentList.map(item => item.StudentId);
            this.services.classService.updateStudentClass(obj).subscribe((item) => {
                this.dialogRef.close();
                this.services.spinnerService.hide();
            });
        }
    }
    public cancel(): void {
        this.dialogRef.close();
    }
}
