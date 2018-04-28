import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { StaffService } from '../../../shared/service/staff/staff.service';
import { StaffBasicInfo, StaffInfo } from '../../../shared/model/staff';

@Component({
    selector: 'app-staff-details',
    templateUrl: './staff-details.component.html',
    styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit {
    public staffInfoId: string;
    public staffInfo = new StaffInfo();

    constructor(private route: ActivatedRoute, private staffService: StaffService, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
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
        this.staffService.getStaffdetails(this.staffInfoId).subscribe((result: StaffInfo) => {
            if (!!result) {
                this.staffInfo = result;

                this.changeDetectorRef.detectChanges();
            }
        });
    }
}
