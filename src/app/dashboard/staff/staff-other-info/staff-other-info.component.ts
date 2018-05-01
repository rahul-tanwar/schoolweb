import { Component, OnInit, Input, ChangeDetectorRef, Injector } from '@angular/core';
import { StaffOtherInfo } from '../../../shared/model/staff';
import { StaffService } from '../../../shared/service/staff/staff.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
@Component({
    selector: 'app-staff-other-info',
    templateUrl: './staff-other-info.component.html',
    styleUrls: ['./staff-other-info.component.css']
})
export class StaffOtherInfoComponent extends BaseComponent implements OnInit {

    @Input() public staffOtherInfo: StaffOtherInfo;

    constructor(
        public injector: Injector,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {
        super(injector);
        // this.staffTypes = this.getStaffType();
    }

    ngOnInit() {
    }


    public save(): void {
        this.services.spinnerService.show();
        this.services.staffService.saveStaffOtherInfo(this.staffOtherInfo).subscribe((result) => {
            this.services.spinnerService.hide();
            this.services.notificationService.show('successfully saved');
        });
    }

    public cancel(): void {
        this.router.navigateByUrl('/dashboard/staff');
    }

}
