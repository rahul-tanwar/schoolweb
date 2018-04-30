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

    foods = [
        { value: 'steak-0', viewValue: 'Class 1' },
        { value: 'pizza-1', viewValue: 'Class 2' },
        { value: 'tacos-2', viewValue: 'Class 3' },
        { value: 'steak-0', viewValue: 'Class 4' },
        { value: 'pizza-1', viewValue: 'Class 5' },
        { value: 'tacos-2', viewValue: 'Class 6' }
    ];


    openDialog(): void {
        const dialogRef = this.dialog.open(AddClassComponent, {
            width: '500px'
            // data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //  this.animal = result;
        });
    }

    ngOnInit() {
        this.services.spinnerService.show();
        this.subscribeClassData();
        this.services.classService.getAllClasses();
    }

    private subscribeClassData(): void {

        this.services.classService.classData.subscribe((result) => {
            if (!!result) {
                this.dataSource = new MatTableDataSource<Class>(result.reverse());
                this.dataSource.paginator = this.paginator;
            }

            //  this.changeDetectorRef.detectChanges();
            //  this.changeDetectorRef.markForCheck();
            this.services.spinnerService.hide();
        });


    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

}

