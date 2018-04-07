import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { SchoolBasicInfo, SchoolOtherInfo, SchoolInfo } from '../../model/school';
import { SchoolServiceApi } from '../../school-api/school/school-api.service';

@Injectable()
export class SchoolService {

    private _schoolData: ReplaySubject<Array<SchoolBasicInfo>> = new ReplaySubject(1);

    get schoolData(): Observable<Array<SchoolBasicInfo>> { return this._schoolData.asObservable(); }

    constructor(private schoolServiceApi: SchoolServiceApi) {
    }

    public getSchoolList(): void {
        this.schoolServiceApi.getAllSchoolList().subscribe((result: Array<SchoolBasicInfo>) => {
            if (!!result && result.length > 0) {
                this._schoolData.next(result);
            } else {
                this._schoolData.next(null);
            }
        }, (error: any) => {
            this._schoolData.error('Could not fetch school list please try again');
        });
    }

    public getSchoolBasicInfoById(schoolUniqueId: string): Observable<SchoolBasicInfo> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.schoolServiceApi.getSchoolBasicInfoById(schoolUniqueId).subscribe((result: SchoolBasicInfo) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                subscriber.error('Could not fetch school info please try again');
            });
        });
    }

    public getSchoolOtherInfoById(schoolUniqueId: string): Observable<SchoolBasicInfo> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.schoolServiceApi.getSchoolOtherInfoById(schoolUniqueId).subscribe((result: SchoolBasicInfo) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                subscriber.error('Could not fetch school other info please try again');
            });
        });
    }




    public saveBasicInfo(schoolBasicInfo: SchoolBasicInfo): Observable<SchoolBasicInfo> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.schoolServiceApi.saveBasicInfo(schoolBasicInfo).subscribe((result: SchoolBasicInfo) => {
                if (!!result) {
                    console.log(JSON.stringify(result));

                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                subscriber.error('Could not save school please try again');
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
                subscriber.error('Could not save school please try again');
            });
        });
    }

    public getSchoolInfo(schoolUniqueId: string): Observable<SchoolInfo> {
        return new Observable((subscriber: Subscriber<any>) => {

            Observable.forkJoin(
                this.schoolServiceApi.getSchoolBasicInfoById(schoolUniqueId),
                this.schoolServiceApi.getSchoolOtherInfoById(schoolUniqueId)
            ).subscribe((result: any) => {
                if (!!result) {
                    const schoolInfo = new SchoolInfo();
                    schoolInfo.schoolBasicInfo = result[0] as SchoolBasicInfo;
                    if (!!result[1]) {
                        schoolInfo.schoolOtherInfo = result[1] as SchoolOtherInfo;
                    } else {
                        const school = new SchoolOtherInfo();
                        school.SchoolInfoId = result[0].SchoolInfoId;
                        schoolInfo.schoolOtherInfo = school;
                    }
                    subscriber.next(schoolInfo);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                subscriber.error('Could not save school please try again');
            });

        });
    }


}
