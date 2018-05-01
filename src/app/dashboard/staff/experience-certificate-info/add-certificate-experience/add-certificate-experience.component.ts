import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '../../../base/base.component';
import { StaffExperience } from '../../../../shared/model/staff';
import { Router } from "@angular/router";
@Component({
    selector: 'app-add-certificate-experience',
    templateUrl: './add-certificate-experience.component.html',
    styleUrls: ['./add-certificate-experience.component.css']
})
export class AddCertificateExperienceComponent extends BaseComponent implements OnInit {
    public staffExperience: StaffExperience;

    constructor(public dialogRef: MatDialogRef<AddCertificateExperienceComponent>, private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private injector: Injector
    ) {
        super(injector);
        this.staffExperience = this.data.staffExperience;
    }

    ngOnInit() {
    }

    public save(): void {
        this.services.spinnerService.show();
        this.services.staffService.saveStaffExperience(this.staffExperience).subscribe((result) => {
            this.services.staffService.getStaffExperiences(this.staffExperience.StaffInfoId.toString());
            this.dialogRef.close('successfully');
            this.services.spinnerService.hide();
            this.services.notificationService.show('successfully saved');
        });
    }

    public cancel(): void {
        this.dialogRef.close('successfully');
    }


}
