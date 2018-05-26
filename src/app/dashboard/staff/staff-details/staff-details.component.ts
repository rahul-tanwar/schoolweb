import { Component, OnInit, OnDestroy, ChangeDetectorRef, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { StaffService } from '../../../shared/service/staff/staff.service';
import { StaffBasicInfo, StaffInfo } from '../../../shared/model/staff';
import { BaseComponent } from '../../base/base.component';
@Component({
    selector: 'app-staff-details',
    templateUrl: './staff-details.component.html',
    styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent extends BaseComponent implements OnInit {
    public staffInfoId: string;
    public staffInfo = new StaffInfo();

    constructor(private route: ActivatedRoute, public injector: Injector, private changeDetectorRef: ChangeDetectorRef) { super(injector); }
    ngOnInit() {
        this.services.spinnerService.show();
        this.subscribeRouteParams().then(() => {
            this.getStaffInfo();
        });

    }

    private subscribeRouteParams(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.route.params.subscribe(params => {
                this.staffInfoId = params['id'];
                resolve(true);
            }, (error) => {
                reject(false);
            }
            );
        });
    }
    private getStaffInfo() {

        this.services.staffService.getStaffdetails(this.staffInfoId).subscribe((result: StaffInfo) => {
            if (!!result) {
                this.staffInfo = result;
                this.services.stateMachineService.setBreadCrumb.next('Staff / ' + this.staffInfo.staffBasicInfo.FirstName + ' ' +
                    this.staffInfo.staffBasicInfo.LastName);
                this.changeDetectorRef.detectChanges();
                this.services.spinnerService.hide();
            }
            this.services.spinnerService.hide();
        });
    }
}
