import { OnInit, AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentService } from '../../shared/service/student/student.service';
import { Student } from '../../shared/model/student';
import { ClassService } from '../../shared/service/class/class.service';
import { Class } from '../../shared/model/class';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {



    displayedColumns = ['name'];
    dataSource: MatTableDataSource<Student>;
    studentList: Array<Student>;
    public classList: Array<Class>;


    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog,
        private studentService: StudentService,
        private classService: ClassService
    ) { }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddStudentComponent, {
            width: '500px'
            // data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //  this.animal = result;
        });
    }

    ngOnInit() {
        this.subscribeStudentData();
        this.subscribeClassData();
        this.studentService.getStudentsBySchoolId();
        this.classService.getAllClasses();
    }

    private subscribeClassData(): void {
        this.classService.classData.subscribe((result: Array<Class>) => {
            this.classList = result;
        });
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
        debugger;
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

}
