import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SchoolBasicInfo } from '../../../shared/model/school';
import { SchoolService } from '../../../shared/service/school/school.service';
import { SpinnerService } from '../../../shared/service/spinner/spinner.service';
import { BaseComponent } from '../../base/base.component';
import { setupRouter } from '@angular/router/src/router_module';
@Component({
    selector: 'app-add-school',
    templateUrl: './add-school.component.html',
    styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent extends BaseComponent implements OnInit {

    public schoolBasicInfo = new SchoolBasicInfo();

    constructor(public dialogRef: MatDialogRef<AddSchoolComponent>,
        private injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {

    }

    public save(): void {

        this.services.spinnerService.show();
        this.services.schoolService.saveBasicInfo(this.schoolBasicInfo).subscribe((result) => {
            this.services.schoolService.getSchoolList();
            this.dialogRef.close('successfully');
            this.services.spinnerService.hide();
            this.services.notificationService.show('successfully saved');
        });
    }

    public cancel(): void {
        this.dialogRef.close();
    }

}
