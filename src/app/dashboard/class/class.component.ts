import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassService } from '../../shared/service/class/class.service';
import { Class } from '../../shared/model/class';
import { UserService } from '../../shared/service';

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

    displayedColumns = ['name'];
    dataSource: MatTableDataSource<Class>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog,
        private classService: ClassService,
        private userService: UserService
    ) { }

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
        this.subscribeClassData();
        this.classService.getAllClasses();
    }

    private subscribeClassData(): void {

        this.classService.classData.subscribe((result) => {
            this.dataSource = new MatTableDataSource<Class>(result.reverse());
            this.dataSource.paginator = this.paginator;
            //  this.changeDetectorRef.detectChanges();
            //  this.changeDetectorRef.markForCheck();
        });


    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

}

