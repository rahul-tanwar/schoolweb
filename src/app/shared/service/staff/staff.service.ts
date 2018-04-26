import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { StaffBasicInfo, StaffInfo } from '../../model/staff';
import { Student } from '../../model/student';
import { StaffApiService } from '../../school-api/staff/staff-api.service';
import { Context } from '../../../shared/context';

@Injectable()
export class StaffService {
  private _staffData: ReplaySubject<Array<StaffBasicInfo>> = new ReplaySubject(1);

  get staffData(): Observable<Array<StaffBasicInfo>> { return this._staffData.asObservable(); }
  constructor(private staffApiService: StaffApiService) {

  }
  public getAllStaff(): void {
    const schoolId = Context.getSchoolId();
    this.staffApiService.getAllStaffBySchoolInfoId(schoolId).subscribe((result: Array<StaffBasicInfo>) => {
      if (!!result) {
        this._staffData.next(result);
      } else {
        this._staffData.next(null);
      }
    }, (error: any) => {
      this._staffData.error('Could not fetch staff info please try again');
    });
  }

  public saveStaff(staffModel: StaffBasicInfo): Observable<boolean> {
    staffModel.SchoolInfoId = Context.getSchoolId();
    return new Observable((subscriber: Subscriber<any>) => {
      this.staffApiService.insertUpdateStaff(staffModel).subscribe((result: Array<StaffBasicInfo>) => {
        if (!!result) {
          subscriber.next(true);
        } else {
          subscriber.next(false);
        }
      }, (error: any) => {
        subscriber.error('Could not Save Staff Information Please try again.');
      });
    });
  }

  public getStaffInfo(staffInfoId: string): Observable<StaffInfo> {
    debugger;
    return new Observable((subscriber: Subscriber<any>) => {

      Observable.forkJoin(
        this.staffApiService.getStaffBasicInfoById(staffInfoId)
        // this.schoolServiceApi.getSchoolOtherInfoById(schoolUniqueId)
      ).subscribe((result: any) => {
        if (!!result) {
          const staffInfo = new StaffInfo();
          staffInfo.staffBasicInfo = result[0] as StaffBasicInfo;
          // if (!!result[1]) {
          //   schoolInfo.schoolOtherInfo = result[1] as SchoolOtherInfo;
          // } else {
          //   const school = new SchoolOtherInfo();
          //   school.SchoolInfoId = result[0].SchoolInfoId;
          //   schoolInfo.schoolOtherInfo = school;
          // }
          subscriber.next(staffInfo);
        } else {
          subscriber.next(null);
        }
      }, (error: any) => {
        subscriber.error('Could not save school please try again');
      });

    });
  }
}
