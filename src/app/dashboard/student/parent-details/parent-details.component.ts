import { Component, OnInit, Input, ViewChild, Injector } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddParentComponent } from '../../parent/add-parent/add-parent.component';
import { StudentService } from '../../../shared/service/student/student.service';
import { Parent } from '../../../shared/model/parent';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'app-parent-details',
    templateUrl: './parent-details.component.html',
    styleUrls: ['./parent-details.component.css']
})
export class ParentDetailsComponent extends BaseComponent implements OnInit {

    displayedColumns = ['fname', 'email', 'mobile', 'sign-up'];
    dataSource: MatTableDataSource<Parent>;

    name: string;
    @Input() studentId: number;
    parents: Array<Parent>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog,
        private studentService: StudentService,
        private injector: Injector) {
            super(injector);
        }

    openDialog(parentId: number): void {
        const selectedParent = this.parents.filter((parent) => parent.StudentParentId === parentId);
        const dialogRef = this.dialog.open(AddParentComponent, {
            width: '500px',
            data: { parent: selectedParent[0] }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!!result) {
                this.studentService.getParentsByStudentId(this.studentId);
            }
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }
    ngOnInit() {
        this.subscribeStudentPatentsData();
    }

    private subscribeStudentPatentsData(): void {
        this.studentService.getParentsByStudentId(this.studentId);
        this.studentService.parentData.subscribe((result) => {
            if (!!result) {
                this.dataSource = new MatTableDataSource<Parent>(result.reverse());
                this.dataSource.paginator = this.paginator;
            }
            this.parents = result;
        });
    }

    public sendRemindMail(parentId: string): void {
        this.services.studentService.sendRemindMailToParent(parentId).subscribe((result) => {
            this.services.notificationService.show('Sent successfully');
        });
    }

}
