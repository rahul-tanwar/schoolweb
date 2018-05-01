import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '../../../base/base.component';
import { StaffDocument } from '../../../../shared/model/staff';
import { MultimediaFile } from '../../../../shared/model/mutimedia';

@Component({
    selector: 'app-add-document',
    templateUrl: './add-document.component.html',
    styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent extends BaseComponent implements OnInit {

    public staffDocument: StaffDocument;

    constructor(public dialogRef: MatDialogRef<AddDocumentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private injector: Injector
    ) {
        super(injector);
        this.staffDocument = this.data.staffDocument;
        const file = new MultimediaFile();
        file.id = 'documentId';
        file.labelName = 'Upload file';
        file.required = true;
        this.staffDocument.MultimediaFile = file;
    }

    ngOnInit() {
    }

    public save(): void {
        this.services.spinnerService.show();
        this.services.staffService.saveStaffDocument(this.staffDocument).subscribe((result) => {
            this.services.staffService.getStaffDocuments(this.staffDocument.StaffInfoId.toString());
            this.dialogRef.close('successfully');
            this.services.spinnerService.hide();
            this.services.notificationService.show('successfully saved');
        });
    }

    public cancel(): void {
        this.dialogRef.close('successfully');
    }


}
