import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddClassComponent } from './add-class/add-class.component';
import { Class } from '../../shared/model/class';
import { BaseComponent } from '../base/base.component';
@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.css']
})
export class ClassComponent extends BaseComponent implements OnInit {

    displayedColumns = ['name'];
    dataSource: MatTableDataSource<Class>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog,
        public injector: Injector
    ) { super(injector); }


    openDialog(): void {
        const dialogRef = this.dialog.open(AddClassComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    ngOnInit() {
        this.services.stateMachineService.setBreadCrumb.next('Class');
        this.services.spinnerService.show();
        this.subscribeClassData();
    }

    private subscribeClassData(): void {
        this.services.classService.getAllClasses();
        this.services.classService.classData.subscribe((result) => {
            if (!!result) {
                this.dataSource = new MatTableDataSource<Class>(result.reverse());
                this.dataSource.paginator = this.paginator;
            }
            this.services.spinnerService.hide();
        });
    }

    public applyFilter(filterValue: string): void {
        filterValue = filterValue.trim().toLowerCase(); // Remove whitespace
        this.dataSource.filter = filterValue;
    }

}

