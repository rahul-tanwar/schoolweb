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
    dataSource1: MatTableDataSource<Student>;
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
        });
    }

    ngOnInit() {
        this.services.stateMachineService.setBreadCrumb.next('Student');
        this.services.spinnerService.show();
        this.subscribeStudentData();
        this.subscribeClassData();
    }

    private subscribeClassData(): void {
        this.services.classService.getAllClasses();
        this.services.classService.classData.subscribe((result: Array<Class>) => {
            this.classList = result;
        });
    }

    private subscribeStudentData(): void {
        this.services.studentService.getStudentsBySchoolId();
        this.services.studentService.studentData.subscribe((result) => {
            if (!!result) {
                this.dataSource1 = new MatTableDataSource<Student>(result.reverse());
                this.dataSource1.paginator = this.paginator;
                this.studentList = result;
            }
            this.services.spinnerService.hide();
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource1.filter = filterValue;
    }

    public filterData() {
        if (!!this.filter) {
            this.filter.serachKeyword = '';
            this.dataSource1.filter = '';
            if (!!this.filter.classId) {
                this.dataSource1.data = this.studentList.filter((item) => item.ClassId === this.filter.classId);

            } else {
                this.dataSource1.data = this.studentList;
            }
            this.changeDetectorRef.markForCheck();
            this.changeDetectorRef.detectChanges();
        }
    }




}
