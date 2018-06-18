import { Component, OnInit, Injector, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmService } from '../../../shared/service/confirm/confirm.service';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
    callback: any;
    constructor(public confirmService: ConfirmService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ConfirmComponent>
    ) {
    }

    ngOnInit() {
        this.callback = this.data.callback;
    }

    public delete() {
        this.dialogRef.close();
        this.callback();
    }

    public cancel() {
        this.dialogRef.close();
    }

}
