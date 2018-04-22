import { OnInit, AfterViewInit, ChangeDetectorRef, Injector } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentService } from '../../shared/service/student/student.service';
import { Student } from '../../shared/model/student';
import { ClassService } from '../../shared/service/class/class.service';
import { Class } from '../../shared/model/class';
import { Filter } from '../../shared/model/filter';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css']
})
export class StudentComponent extends BaseComponent implements OnInit {



    displayedColumns = ['name'];
    dataSource: MatTableDataSource<Student>;
    studentList: Array<Student>;
    public classList: Array<Class>;
    public filter = new Filter();


    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog,
        private changeDetectorRef: ChangeDetectorRef,
        private injector: Injector
    ) {
        super(injector);
    }

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
        this.services.studentService.getStudentsBySchoolId();
        this.services.classService.getAllClasses();
    }

    private subscribeClassData(): void {
        this.services.classService.classData.subscribe((result: Array<Class>) => {
            this.classList = result;
        });
    }

    private subscribeStudentData(): void {

        this.services.studentService.studentData.subscribe((result) => {
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

    public filterData() {
        if (!!this.filter) {
            this.filter.serachKeyword = '';
            this.dataSource.filter = '';
            if (!!this.filter.classId) {
                this.dataSource.data = this.studentList.filter((item) => item.ClassId === this.filter.classId);

            } else {
                this.dataSource.data = this.studentList;
            }
            this.changeDetectorRef.markForCheck();
            this.changeDetectorRef.detectChanges();
        }
    }


}
