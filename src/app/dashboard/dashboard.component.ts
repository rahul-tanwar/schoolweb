import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmService } from '../shared/service/confirm/confirm.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmComponent } from '../shared/component/confirm/confirm.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(public confirmService: ConfirmService, public dialog: MatDialog) { }

    ngOnInit() {
        this.subscribeConfirmPopop();
    }

    private subscribeConfirmPopop() {
        this.confirmService.openConfirmPopup().subscribe((callback: any) => {
            const dialogRef = this.dialog.open(ConfirmComponent, {
                width: '500px',
                data: { callback: callback }
            });
        });
    }

}
