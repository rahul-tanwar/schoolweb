import { OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddParentComponent } from '../add-parent/add-parent.component';
import { StudentService } from '../../../shared/service/student/student.service';
import { Parent, ListType } from '../../../shared/model/parent';
import { Filter } from '../../../shared/model/filter';
import { Student } from '../../../shared/model/student';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'app-parent-list',
    templateUrl: './parent-list.component.html',
    styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent extends BaseComponent implements OnInit {

    displayedColumns = ['STUDENT', 'PARENTS', 'SIGN UP', 'CHECK-IN CODE'];
    dataSource: MatTableDataSource<Student>;
    studentParents: Array<Student> = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input() id = 0;
    @Input() type: ListType;

    constructor(public dialog: MatDialog, public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.loadParents();
        this.subscribeFilter();
    }

    private loadParents() {
        this.services.spinnerService.show();
        switch (this.type) {
            case ListType.All:
                this.subscribeAllPatentsData();
                break;
            case ListType.Class:
                this.subscribeClassPatentsData();
                break;

            case ListType.Student:
                // this.loadstudentParents();
                break;
            default:
                break;
        }
    }



    private subscribeAllPatentsData(): void {
        this.services.studentService.getAllParents();
        this.services.studentService.getAllParentsData.subscribe((result) => {
            if (!!result) {
                this.dataSource = new MatTableDataSource<Student>(result.reverse());
                this.studentParents = result;
                this.dataSource.paginator = this.paginator;
            }
            this.services.spinnerService.hide();
        });
    }

    public subscribeFilter() {
        this.services.studentService.getfilterParents.subscribe((filter: Filter) => {
            if (!!filter) {
                if (!!filter.classId && filter.classId > 0) {
                    this.dataSource.data = this.studentParents.filter((item) => item.ClassId === filter.classId);
                    if (!!filter.serachKeyword) {
                        filter.serachKeyword = filter.serachKeyword.trim().toLowerCase();
                        this.dataSource.filter = filter.serachKeyword;
                    } else {
                        this.dataSource.filter = '';
                    }
                } else {
                    this.dataSource.data = this.studentParents;
                    if (!!filter.serachKeyword) {
                        filter.serachKeyword = filter.serachKeyword.trim().toLowerCase(); // Remove whitespace
                        this.dataSource.filter = filter.serachKeyword;
                    } else {
                        this.dataSource.filter = '';
                    }
                }
                this.services.spinnerService.hide();
            }
        });
    }


    private subscribeClassPatentsData(): void {
        this.services.studentService.getParentsByClassId(this.id);
        this.services.studentService.getClassParentsData.subscribe((result) => {
            if (!!result) {
                this.dataSource = new MatTableDataSource<Student>(result);
                this.dataSource.paginator = this.paginator;
                this.studentParents = result;
            }

            this.services.spinnerService.hide();
        });
    }


    openParentDialog(studentId: number, parent: Parent): void {
        const parentObj = new Parent();
        parentObj.StudentId = studentId;
        const dialogRef = this.dialog.open(AddParentComponent, {
            width: '500px',
            data: { 'parent': !!parent ? parent : parentObj },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!!result) {
                this.loadParents();
            }
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    public sendRemindMail(parentId: string): void {
        this.services.spinnerService.show();
        this.services.studentService.sendRemindMailToParent(parentId).subscribe((result) => {
            this.services.spinnerService.hide();
            this.services.notificationService.show('Sent successfully');
        });
    }


}
