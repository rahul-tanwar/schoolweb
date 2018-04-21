import { OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddParentComponent } from '../add-parent/add-parent.component';
import { StudentService } from '../../../shared/service/student/student.service';
import { StudentParents, Parent, ListType } from '../../../shared/model/parent';
import { SpinnerService } from '../../../shared/service/spinner/spinner.service';

@Component({
    selector: 'app-parent-list',
    templateUrl: './parent-list.component.html',
    styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {

    displayedColumns = ['STUDENT', 'PARENTS', 'SIGN UP', 'CHECK-IN CODE'];
    dataSource: MatTableDataSource<StudentParents>;
    studentParents: Array<StudentParents> = [];

    @Input() id = 0;
    @Input() type: ListType;
    @Input() set filter(filterValue: string) {

        // filterValue = filterValue.trim(); // Remove whitespace
        // filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        // this.dataSource.filter = filterValue;
    }



    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog,
        private studentService: StudentService,
        private changeDetectorRef: ChangeDetectorRef,
        private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerService.show();
        this.loadParents();
    }

    private loadParents() {
        debugger;
        switch (this.type) {
            case ListType.All:
                this.loadAllParents();
                break;
            case ListType.Class:
                this.loadClassParents();
                break;

            case ListType.Student:
                this.loadstudentParents();
                break;
            default:
                break;
        }
    }

    private loadAllParents() {
        this.subscribeAllPatentsData();
        this.studentService.getAllParents();
    }
    private loadClassParents() {
        this.subscribeClassPatentsData();
        this.studentService.getParentsByClassId(this.id);
    }

    private loadstudentParents() {

    }



    private subscribeAllPatentsData(): void {

        this.studentService.getAllParentsData.subscribe((result) => {
            this.dataSource = new MatTableDataSource<StudentParents>(result.reverse());
            this.dataSource.paginator = this.paginator;
            this.studentParents = result.reverse();
            this.spinnerService.hide();
            //  this.changeDetectorRef.detectChanges();
            // this.changeDetectorRef.markForCheck();
        });
    }


    private subscribeClassPatentsData(): void {

        this.studentService.getClassParentsData.subscribe((result) => {
            this.dataSource = new MatTableDataSource<StudentParents>(result.reverse());
            this.dataSource.paginator = this.paginator;
            this.studentParents = result.reverse();
            this.spinnerService.hide();
            //  this.changeDetectorRef.detectChanges();
            this.changeDetectorRef.markForCheck();
        });
    }


    openParentDialog(studentId: number, parent: Parent): void {
        const parentObj = new Parent();
        parentObj.StudentId = studentId;

        const dialogRef = this.dialog.open(AddParentComponent, {
            width: '500px',
            data: { 'parent': !!parent ? parent : parentObj }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!!result) {
                this.loadParents();
            }
            console.log('The dialog was closed');
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

}
