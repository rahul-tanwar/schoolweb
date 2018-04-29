import { Component, OnInit, Input, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { StaffBasicInfo, StaffTypeModel, StaffSubTypeModel } from '../../../shared/model/staff';
import { StaffService } from '../../../shared/service/staff/staff.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from "@angular/router";
@Component({
    selector: 'app-staff-info',
    templateUrl: './staff-info.component.html',
    styleUrls: ['./staff-info.component.css']
})

export class StaffInfoComponent implements OnInit {
    @Input() public staffBasicInfo = new StaffBasicInfo();
    selectedStaffType: StaffTypeModel = new StaffTypeModel(0, ' ');
    staffTypes: StaffTypeModel[];
    staffSubTypes: StaffSubTypeModel[];

    constructor(
        private staffService: StaffService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {
        // this.staffTypes = this.getStaffType();
    }
    public onSelect(staffTypeId) {
        this.staffSubTypes = this.staffService.getStaffSubTypeId().filter((item) => item.StaffTypeId === staffTypeId);
    }


    ngOnInit() {
    }

    public save(): void {
        this.staffService.saveStaff(this.staffBasicInfo).subscribe((result) => {
            alert('successfully save');
        });
    }

    public cancel(): void {
        this.router.navigateByUrl('/dashboard/staff');
    }

}
