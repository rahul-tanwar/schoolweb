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
  public staffBasicInfo: StaffBasicInfo = new StaffBasicInfo();

  constructor(private route: ActivatedRoute, private staffService: StaffService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    debugger
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
    this.staffService.getStaffInfo(this.staffInfoId).subscribe((result: StaffInfo) => {
      if (!!result) {
        this.staffBasicInfo = result.staffBasicInfo;
        // this.schoolOtherInfo = result.schoolOtherInfo;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
