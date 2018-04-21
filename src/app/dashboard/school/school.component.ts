import { OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddSchoolComponent } from '../school/add-school/add-school.component';
import { SchoolService } from '../../shared/service/school/school.service';
import { SchoolBasicInfo } from '../../shared/model/school';

@Component({
    selector: 'app-school',
    templateUrl: './school.component.html',
    styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
    displayedColumns = ['schoolId', 'schoolName', 'city', 'board', 'schoolType', 'status'];
    dataSource: MatTableDataSource<SchoolBasicInfo>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, private schoolService: SchoolService, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.subscribeSchoolData();
        this.schoolService.getSchoolList();
    }


    public openDialog(): void {

        const dialogRef = this.dialog.open(AddSchoolComponent, {
            width: '500px'
            //  data: { schoolBasicInfo: new SchoolBasicInfo() }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //  this.animal = result;
        });
    }

    private subscribeSchoolData(): void {

        this.schoolService.schoolData.subscribe((result) => {
            this.dataSource = new MatTableDataSource<SchoolBasicInfo>(result.reverse());
            this.dataSource.paginator = this.paginator;
            //  this.changeDetectorRef.detectChanges();
            this.changeDetectorRef.markForCheck();
        });
    }

    public applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
