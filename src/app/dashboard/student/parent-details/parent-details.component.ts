import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddParentComponent } from '../../parent/add-parent/add-parent.component';
import { StudentService } from '../../../shared/service/student/student.service';
import { Parent } from '../../../shared/model/parent';

@Component({
    selector: 'app-parent-details',
    templateUrl: './parent-details.component.html',
    styleUrls: ['./parent-details.component.css']
})
export class ParentDetailsComponent implements OnInit {

    displayedColumns = ['fname', 'email', 'mobile', 'sign-up'];
    dataSource: MatTableDataSource<Parent>;

    name: string;
    @Input() studentId: number;
    parents: Array<Parent>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog,
        private studentService: StudentService) { }

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
        this.studentService.getParentsByStudentId(this.studentId);
    }

    private subscribeStudentPatentsData(): void {

        this.studentService.parentData.subscribe((result) => {
            this.dataSource = new MatTableDataSource<Parent>(result.reverse());
            this.dataSource.paginator = this.paginator;
            this.parents = result;
        });
    }

}
