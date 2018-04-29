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



    displayedColumns = ['name', 'value', 'attachemnt', 'manualVerification', 'verifiedBy', 'delete'];
    dataSource = new MatTableDataSource<StaffDocument>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input()
    set staffDocuments(staffDocuments: Array<StaffDocument>) {
        this.dataSource.data = staffDocuments;
    }
    @Input() staffId: number;

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
    public removeDocument(documentId: string) {
        this.services.staffService.deleteStaffDocument(documentId).subscribe((result) => {
            if (result) {
                this.services.notificationService.show('deleted successfully');
                this.services.staffService.getStaffDocuments(this.staffId.toString());
            }
        });
    }


}
