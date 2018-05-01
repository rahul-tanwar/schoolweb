import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StaffService } from '../../../shared/service/staff/staff.service';
import { StaffBasicInfo, StaffTypeModel, StaffSubTypeModel } from '../../../shared/model/staff';
import { BaseComponent } from '../../base/base.component';
@Component({
    selector: 'app-add-staff',
    templateUrl: './add-staff.component.html',
    styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent extends BaseComponent implements OnInit {
    public staffModel = new StaffBasicInfo();
    selectedStaffType: StaffTypeModel = new StaffTypeModel(0, ' ');
    staffTypes: StaffTypeModel[];
    staffSubTypes: StaffSubTypeModel[];
    constructor(public dialogRef: MatDialogRef<AddStaffComponent>,
        public injector: Injector) {
        super(injector);
        this.staffTypes = this.getStaffType();
    }

    onSelect(staffTypeId) {
        this.staffSubTypes = this.getStaffSubTypeId().filter((item) => item.StaffTypeId === staffTypeId);
    }

    ngOnInit() {
    }

    public save(): void {
        this.services.spinnerService.show();
        this.services.staffService.saveStaff(this.staffModel).subscribe((result) => {
            this.services.staffService.getAllStaff();
            this.services.spinnerService.hide();
            this.dialogRef.close('successfully');
            this.services.notificationService.show('successfully saved');
        });
    }

    getStaffType() {
        return [
            new StaffTypeModel(1, 'Management'),
            new StaffTypeModel(2, 'Technical'),
            new StaffTypeModel(3, 'Clerical'),
            new StaffTypeModel(4, 'Supporting')
        ];
    }

    getStaffSubTypeId() {
        return [
            new StaffSubTypeModel(1, 1, 'Principal'),
            new StaffSubTypeModel(2, 1, 'President'),
            new StaffSubTypeModel(3, 1, 'Vice-president'),
            new StaffSubTypeModel(4, 1, 'Owner'),
            new StaffSubTypeModel(5, 1, 'Secretary'),
            new StaffSubTypeModel(6, 1, 'Treasurer'),
            new StaffSubTypeModel(7, 1, 'Board Member'),
            new StaffSubTypeModel(8, 1, 'Other'),
            new StaffSubTypeModel(9, 2, 'OTHER'),
            new StaffSubTypeModel(10, 3, 'OTHER'),
            new StaffSubTypeModel(11, 4, 'Helper'),
            new StaffSubTypeModel(12, 4, 'Driver'),
            new StaffSubTypeModel(14, 4, 'Cleaner'),
            new StaffSubTypeModel(15, 4, 'Cook'),
            new StaffSubTypeModel(16, 4, 'Security'),
            new StaffSubTypeModel(17, 4, 'Maintenance'),
            new StaffSubTypeModel(18, 4, 'OTHER'),
        ];
    }

    public cancel(): void {
        this.dialogRef.close();
    }
}


