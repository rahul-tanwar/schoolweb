import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { StaffOtherInfo } from '../../../shared/model/staff';
import { StaffService } from '../../../shared/service/staff/staff.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-staff-other-info',
    templateUrl: './staff-other-info.component.html',
    styleUrls: ['./staff-other-info.component.css']
})
export class StaffOtherInfoComponent implements OnInit {

    @Input() public staffOtherInfo: StaffOtherInfo;

    constructor(
        private staffService: StaffService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {
        // this.staffTypes = this.getStaffType();
    }

    ngOnInit() {
    }


    public save(): void {
        debugger;
        this.staffService.saveStaffOtherInfo(this.staffOtherInfo).subscribe((result) => {
            alert('successfully save');
        });
    }

    public cancel(): void {
        this.router.navigateByUrl('/dashboard/staff');
    }

}
