import { Component, OnInit, Input, Injector, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddDocumentComponent } from './add-document/add-document.component';
import { StaffDocument } from '../../../shared/model/staff';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'app-document-staff',
    templateUrl: './document-staff.component.html',
    styleUrls: ['./document-staff.component.css']
})
export class DocumentStaffComponent extends BaseComponent implements OnInit {

    @Input() staffDocuments: Array<StaffDocument> = [];
    @Input() staffId: number;

    displayedColumns = ['name', 'value', 'attachemnt', 'manualVerification', 'verifiedBy'];
    dataSource = new MatTableDataSource<StaffDocument>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, public injector: Injector) {
        super(injector);
    }

    openDialog(): void {
        const staffDocument = new StaffDocument();
        staffDocument.StaffInfoId = this.staffId;
        const dialogRef = this.dialog.open(AddDocumentComponent, {
            width: '500px',
            data: { staffDocument: staffDocument }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //   this.animal = result;
        });
    }

    ngOnInit() {
        this.dataSource.data = this.staffDocuments;
        this.subscribeStaffDocumentData();
    }

    private subscribeStaffDocumentData(): void {
        this.services.staffService.staffDocumentData.subscribe((result) => {
            this.dataSource = new MatTableDataSource<StaffDocument>(result.reverse());
            this.dataSource.paginator = this.paginator;
        });


    }


}
