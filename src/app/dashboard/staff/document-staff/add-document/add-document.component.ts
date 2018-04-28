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
        this.staffDocument.MultimediaFile = file;
    }

    ngOnInit() {
    }

}
