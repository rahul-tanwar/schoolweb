import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { StaffService } from '../../shared/service/staff/staff.service';
import { StaffBasicInfo } from '../../shared/model/staff';
import { UserService } from '../../shared/service';
import { BaseComponent } from '../base/base.component';
@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.css']
})
export class StaffComponent extends BaseComponent implements OnInit {


    displayedColumns = ['name'];
    dataSource: MatTableDataSource<StaffBasicInfo>;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(public dialog: MatDialog,
        public injector: Injector
    ) { super(injector); }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddStaffComponent, {
            width: '500px'
            // data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //  this.animal = result;
        });
    }

    ngOnInit() {
        this.services.stateMachineService.setBreadCrumb.next('Staff');
        this.services.spinnerService.show();
        this.subscribeStaffData();
        this.services.staffService.getAllStaff();
    }

    private subscribeStaffData(): void {

        this.services.staffService.staffData.subscribe((result) => {
            if (!!result) {
                this.dataSource = new MatTableDataSource<StaffBasicInfo>(result.reverse());
                this.dataSource.paginator = this.paginator;
            }
            this.services.spinnerService.hide();
        });


    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

}
