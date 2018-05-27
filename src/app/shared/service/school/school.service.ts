import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { SchoolBasicInfo, SchoolOtherInfo, SchoolInfo, stateList } from '../../model/school';
import { SchoolServiceApi } from '../../school-api/school/school-api.service';
import { NotificationService } from '../notification/notification.service';
import { SpinnerService } from '../spinner/spinner.service';
import { Context } from '../../context';
import { jsObject } from '../../model/jsobject';

@Injectable()
export class SchoolService {

    private _schoolData: ReplaySubject<Array<SchoolBasicInfo>> = new ReplaySubject(1);

    get schoolData(): Observable<Array<SchoolBasicInfo>> { return this._schoolData.asObservable(); }

    private _schoolInfo: ReplaySubject<SchoolInfo> = new ReplaySubject(1);

    get schoolInfo(): Observable<SchoolInfo> { return this._schoolInfo.asObservable(); }


    constructor(private schoolServiceApi: SchoolServiceApi,
        private notificationService: NotificationService,
        private spinnerService: SpinnerService) {
    }

    public getSchoolList(): void {
        this.schoolServiceApi.getAllSchoolList().subscribe((result: Array<SchoolBasicInfo>) => {
            if (!!result && result.length > 0) {
                this._schoolData.next(result);
            } else {
                this._schoolData.next(null);
            }
        }, (error: any) => {
            this.spinnerService.hide();
            this.notificationService.show(error);
            this._schoolData.error('Could not fetch school list please try again');
        });
    }

    public getSchoolInfoById(schoolId: string): Observable<SchoolInfo> {

        return new Observable((subscriber: Subscriber<any>) => {
            this.schoolServiceApi.getSchoolInfoById(schoolId).subscribe((result: jsObject) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not fetch school info please try again');
            });
        });
    }

    public getSchoolBasicInfoByUniqueId(schoolUniqueId: string): Observable<SchoolBasicInfo> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.schoolServiceApi.getSchoolBasicInfoByUniqueId(schoolUniqueId).subscribe((result: SchoolBasicInfo) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not fetch school info please try again');
            });
        });
    }

    public getSchoolOtherInfoByUniqueId(schoolUniqueId: string): Observable<SchoolBasicInfo> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.schoolServiceApi.getSchoolOtherInfoByUniqueId(schoolUniqueId).subscribe((result: SchoolBasicInfo) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not fetch school other info please try again');
            });
        });
    }




    public saveBasicInfo(schoolBasicInfo: SchoolBasicInfo): Observable<SchoolBasicInfo> {
        schoolBasicInfo.UserId = Context.getUserId();
        return new Observable((subscriber: Subscriber<any>) => {
            this.schoolServiceApi.saveBasicInfo(schoolBasicInfo).subscribe((result: SchoolBasicInfo) => {
                if (!!result) {
                    console.log(JSON.stringify(result));

                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                // subscriber.error('Could not save school please try again');
            });
        });
    }

    public saveOtherInfo(schoolOtherInfo: SchoolOtherInfo): Observable<SchoolOtherInfo> {

        return new Observable((subscriber: Subscriber<any>) => {
            this.schoolServiceApi.saveOtherInfo(schoolOtherInfo).subscribe((result: SchoolOtherInfo) => {
                if (!!result) {
                    console.log(JSON.stringify(result));

                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not save school please try again');
            });
        });
    }

    public setSuperAdminSchool(schoolId: number): Observable<SchoolOtherInfo> {
        const obj = {
            UserId: Context.getUserId(),
            SchoolInfoId: schoolId
        };
        return new Observable((subscriber: Subscriber<any>) => {
            this.schoolServiceApi.addsuperadminschool(obj).subscribe((result: SchoolOtherInfo) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not set school for super admin please try again');
            });
        });
    }

    public deleteSuperAdminSchool(): Observable<SchoolOtherInfo> {
        const obj = {
            UserId: Context.getUserId(),
            SchoolInfoId: 0
        };
        return new Observable((subscriber: Subscriber<any>) => {
            this.schoolServiceApi.deletesuperadminschool(obj).subscribe((result: SchoolOtherInfo) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not delete school for super admin please try again');
            });
        });
    }

    public getSchoolInfo(schoolUniqueId: string): void {

        Observable.forkJoin(
            this.schoolServiceApi.getSchoolBasicInfoByUniqueId(schoolUniqueId),
            this.schoolServiceApi.getSchoolOtherInfoByUniqueId(schoolUniqueId)
        ).subscribe((result: any) => {
            if (!!result) {
                const schoolInfo = new SchoolInfo();
                schoolInfo.schoolBasicInfo = result[0] as SchoolBasicInfo;
                schoolInfo.schoolBasicInfo.states = stateList;
                if (!!result[1]) {
                    schoolInfo.schoolOtherInfo = result[1] as SchoolOtherInfo;
                } else {
                    const school = new SchoolOtherInfo();
                    school.SchoolInfoId = result[0].SchoolInfoId;
                    schoolInfo.schoolOtherInfo = school;
                }
                this._schoolInfo.next(schoolInfo);
            } else {
                this._schoolInfo.next(null);
            }
        }, (error: any) => {
            this.spinnerService.hide();
            this.notificationService.show(error);
            this._schoolInfo.error('Could not save school please try again');
        });
    }


}
