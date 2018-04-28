import { OnInit, Inject } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ClassService } from '../../../shared/service/class/class.service';
import { StudentService } from '../../../shared/service/student/student.service';
import { Student } from '../../../shared/model/student';
import { StudentClassModel } from '../../../shared/model/class';


@Component({
    selector: 'app-add-student-class',
    templateUrl: './add-student-class.component.html',
    styleUrls: ['./add-student-class.component.css']
})
export class AddStudentClassComponent implements OnInit {
    studentList: Array<Student>;
    displayedColumns = ['select', 'name'];
    dataSource: MatTableDataSource<Student>;
    selection = new SelectionModel<Student>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor( @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AddStudentClassComponent>,
        private classService: ClassService,
        private studentService: StudentService) {
    }

    ngOnInit() {
        this.subscribeStudentData();
        this.studentService.getStudentsBySchoolId();
    }

    private subscribeStudentData(): void {

        this.studentService.studentData.subscribe((result) => {
            this.dataSource = new MatTableDataSource<Student>(result.reverse());
            this.dataSource.paginator = this.paginator;
            this.studentList = result;
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
            const obj = new StudentClassModel();
            obj.ClassId = this.data.classId;
            obj.StudentIds = studentList.map(item => item.StudentId);
            this.classService.updateStudentClass(obj).subscribe((item) => {
                this.dialogRef.close();
            });
        }
    }
    public cancel(): void {
        this.dialogRef.close();
    }
}
