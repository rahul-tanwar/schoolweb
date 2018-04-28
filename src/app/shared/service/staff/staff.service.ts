import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import * as Model from '../../model/staff';
import { Student } from '../../model/student';
import { StaffApiService } from '../../school-api/staff/staff-api.service';
import { Context } from '../../../shared/context';

@Injectable()
export class StaffService {
    private _staffData: ReplaySubject<Array<Model.StaffBasicInfo>> = new ReplaySubject(1);

    get staffData(): Observable<Array<Model.StaffBasicInfo>> { return this._staffData.asObservable(); }

    private _staffDocumentData: ReplaySubject<Array<Model.StaffDocument>> = new ReplaySubject(1);

    get staffDocumentData(): Observable<Array<Model.StaffDocument>> { return this._staffDocumentData.asObservable(); }

    constructor(private staffApiService: StaffApiService) {

    }
    public getAllStaff(): void {
        const schoolId = Context.getSchoolId();
        this.staffApiService.getAllStaffBySchoolInfoId(schoolId).subscribe((result: Array<Model.StaffBasicInfo>) => {
            if (!!result) {
                this._staffData.next(result);
            } else {
                this._staffData.next(null);
            }
        }, (error: any) => {
            this._staffData.error('Could not fetch staff info please try again');
        });
    }

    public saveStaff(staffBasicInfo: Model.StaffBasicInfo): Observable<boolean> {
        staffBasicInfo.SchoolInfoId = Context.getSchoolId();
        staffBasicInfo.UpdatedEmail = Context.getUserName();
        return new Observable((subscriber: Subscriber<any>) => {
            this.staffApiService.insertUpdateStaff(staffBasicInfo).subscribe((result: Model.StaffBasicInfo) => {
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

    public getStaffBasicInfo(staffId: string): Observable<Model.StaffBasicInfo> {
        return new Observable((subscriber: Subscriber<any>) => {

            this.staffApiService.getStaffBasicInfoById(staffId)
                .subscribe((result: Model.StaffBasicInfo) => {
                    if (!!result) {
                        subscriber.next(result);
                    } else {
                        subscriber.next(null);
                    }
                }, (error: any) => {
                    subscriber.error('Could not save school please try again');
                });

        });
    }

    public saveStaffOtherInfo(staffOtherInfo: Model.StaffOtherInfo): Observable<boolean> {
        staffOtherInfo.UpdatedEmail = Context.getUserName();
        return new Observable((subscriber: Subscriber<any>) => {
            this.staffApiService.insertUpdateStaffOtherInfo(staffOtherInfo).subscribe((result: Array<Model.StaffOtherInfo>) => {
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

    public getStaffOtherInfo(staffId: string): Observable<Model.StaffOtherInfo> {
        return new Observable((subscriber: Subscriber<any>) => {
            this.staffApiService.getStaffOtherInfoByStaffId(staffId)
                .subscribe((result: Model.StaffOtherInfo) => {
                    if (!!result) {
                        subscriber.next(result);
                    } else {
                        subscriber.next(null);
                    }
                }, (error: any) => {
                    subscriber.error('Could not save school please try again');
                });

        });
    }

    public saveStaffExperience(staffExperience: Model.StaffExperience): Observable<boolean> {
        return new Observable((subscriber: Subscriber<any>) => {
            this.staffApiService.insertUpdateStaffExperience(staffExperience).subscribe((result: Model.StaffExperience) => {
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

    public getStaffExperiences(staffId: string): Observable<Array<Model.StaffExperience>> {
        return new Observable((subscriber: Subscriber<any>) => {
            this.staffApiService.getStaffExperienceInfobyStaffId(staffId)
                .subscribe((result: Array<Model.StaffExperience>) => {
                    if (!!result) {
                        subscriber.next(result);
                    } else {
                        subscriber.next(null);
                    }
                }, (error: any) => {
                    subscriber.error('Could not save school please try again');
                });

        });
    }

    public saveStaffClass(staffClass: Model.StaffClass): Observable<Model.StaffClass> {
        staffClass.UpdatedEmail = Context.getUserName();
        return new Observable((subscriber: Subscriber<any>) => {
            this.staffApiService.insertStaffClass(staffClass).subscribe((result: Model.StaffClass) => {
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

    public getStaffClass(staffId: string): Observable<Model.StaffClass> {
        return new Observable((subscriber: Subscriber<any>) => {
            this.staffApiService.getstaffallclassbystaffid(staffId)
                .subscribe((result: Model.StaffClass) => {
                    if (!!result) {
                        subscriber.next(result);
                    } else {
                        subscriber.next(null);
                    }
                }, (error: any) => {
                    subscriber.error('Could not fetch staff classes please try again');
                });

        });
    }

    public saveStaffDocument(staffdocument: Model.StaffDocument): Observable<boolean> {
        staffdocument.UpdatedEmail = Context.getUserName();
        return new Observable((subscriber: Subscriber<any>) => {
            this.staffApiService.insertStaffDoc(staffdocument).subscribe((result: Model.StaffDocument) => {
                debugger;
                if (!!result) {
                    subscriber.next(true);
                } else {
                    subscriber.next(false);
                }
            }, (error: any) => {
                subscriber.error('Could not Save Staff document Please try again.');
            });
        });
    }

    public getStaffDocuments(staffId: string): void {
        this.staffApiService.getStaffallDocByStaffId(staffId)
            .subscribe((result: Array<Model.StaffDocument>) => {
                if (!!result) {
                    this._staffDocumentData.next(result);
                } else {
                    this._staffDocumentData.next(null);
                }
            }, (error: any) => {
                this._staffDocumentData.error('Could not fetch staff documents please try again');
            });

    }

    public deleteStaffDocument(StaffdocumentId: string): Observable<boolean> {
        return new Observable((subscriber: Subscriber<any>) => {
            this.staffApiService.deleteStaffDocByDocid(StaffdocumentId).subscribe((result: boolean) => {
                if (!!result) {
                    subscriber.next(true);
                } else {
                    subscriber.next(false);
                }
            }, (error: any) => {
                subscriber.error('Could not Save Staff document Please try again.');
            });
        });
    }

    public getStaffdetails(staffId: string): Observable<Model.StaffInfo> {
        return new Observable((subscriber: Subscriber<any>) => {
            Observable.forkJoin(
                this.staffApiService.getStaffBasicInfoById(staffId),
                this.staffApiService.getStaffOtherInfoByStaffId(staffId),
                this.staffApiService.getStaffExperienceInfobyStaffId(staffId),
                this.staffApiService.getstaffallclassbystaffid(staffId),
                this.staffApiService.getStaffallDocByStaffId(staffId),
            ).subscribe((result: any) => {
                const staffInfo = new Model.StaffInfo();
                if (!!result) {
                    staffInfo.staffBasicInfo = new Model.StaffBasicInfo();
                    if (!!result[0]) {
                        staffInfo.staffBasicInfo = result[0];
                        staffInfo.staffBasicInfo.staffTypeList = this.getStaffType();
                        staffInfo.staffBasicInfo.staffSubTypeList =
                            this.getStaffSubTypeId().filter((item) => item.StaffTypeId === staffInfo.staffBasicInfo.StaffTypeId);
                    }
                    staffInfo.staffOtherInfo = !!result[1] ? result[1] : new Model.StaffBasicInfo();
                    staffInfo.staffOtherInfo.StaffInfoId = staffInfo.staffBasicInfo.StaffInfoId;
                    staffInfo.staffExperiences = result[2];
                    staffInfo.staffClass = !!result[3] ? result[3] : new Model.StaffClass();
                    staffInfo.staffClass.StaffInfoId = staffInfo.staffBasicInfo.StaffInfoId;
                    staffInfo.staffDocuments = result[4];
                }
                subscriber.next(staffInfo);
                subscriber.complete();
            }, (error: any) => {
                subscriber.error('error');
            });
        });
    }

    getStaffType() {
        return [
            new Model.StaffTypeModel(1, 'Management'),
            new Model.StaffTypeModel(2, 'Technical'),
            new Model.StaffTypeModel(3, 'Clerical'),
            new Model.StaffTypeModel(4, 'Supporting')
        ];
    }

    getStaffSubTypeId() {
        return [
            new Model.StaffSubTypeModel(1, 1, 'Principal'),
            new Model.StaffSubTypeModel(2, 1, 'President'),
            new Model.StaffSubTypeModel(3, 1, 'Vice-president'),
            new Model.StaffSubTypeModel(4, 1, 'Owner'),
            new Model.StaffSubTypeModel(5, 1, 'Secretary'),
            new Model.StaffSubTypeModel(6, 1, 'Treasurer'),
            new Model.StaffSubTypeModel(7, 1, 'Board Member'),
            new Model.StaffSubTypeModel(8, 1, 'Other'),
            new Model.StaffSubTypeModel(9, 2, 'OTHER'),
            new Model.StaffSubTypeModel(10, 3, 'OTHER'),
            new Model.StaffSubTypeModel(11, 4, 'Helper'),
            new Model.StaffSubTypeModel(12, 4, 'Driver'),
            new Model.StaffSubTypeModel(14, 4, 'Cleaner'),
            new Model.StaffSubTypeModel(15, 4, 'Cook'),
            new Model.StaffSubTypeModel(16, 4, 'Security'),
            new Model.StaffSubTypeModel(17, 4, 'Maintenance'),
            new Model.StaffSubTypeModel(18, 4, 'OTHER'),
        ];
    }




}
