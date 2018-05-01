import { Component, OnInit, Input, Inject, ChangeDetectorRef, AfterViewInit, Injector } from '@angular/core';
import { StaffBasicInfo, StaffTypeModel, StaffSubTypeModel } from '../../../shared/model/staff';
import { StaffService } from '../../../shared/service/staff/staff.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
@Component({
    selector: 'app-staff-info',
    templateUrl: './staff-info.component.html',
    styleUrls: ['./staff-info.component.css']
})

export class StaffInfoComponent extends BaseComponent implements OnInit {
    @Input() public staffBasicInfo = new StaffBasicInfo();
    selectedStaffType: StaffTypeModel = new StaffTypeModel(0, ' ');
    staffTypes: StaffTypeModel[];
    staffSubTypes: StaffSubTypeModel[];

    constructor(
        public injector: Injector,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {
        // this.staffTypes = this.getStaffType();
        super(injector);
    }
    public onSelect(staffTypeId) {
        this.staffSubTypes = this.services.staffService.getStaffSubTypeId().filter((item) => item.StaffTypeId === staffTypeId);
    }


    ngOnInit() {
    }

    public save(): void {
        this.services.spinnerService.show();
        this.services.staffService.saveStaff(this.staffBasicInfo).subscribe((result) => {
            this.services.spinnerService.hide();
            this.services.notificationService.show('successfully saved');
        });
    }

    public cancel(): void {
        this.router.navigateByUrl('/dashboard/staff');
    }

}
