import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { Student, StudentAppCode } from '../../model/student';
import { Parent } from '../../model/parent';
import { Filter } from '../../model/filter';
import { StudentApiService } from '../../school-api/student/student-api.service';
import { Context } from '../../../shared/context';
import { NotificationService } from '../notification/notification.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class StudentService {

    private _studentData: ReplaySubject<Array<Student>> = new ReplaySubject(1);

    get studentData(): Observable<Array<Student>> { return this._studentData.asObservable(); }

    private _parentData: ReplaySubject<Array<Parent>> = new ReplaySubject(1);

    get parentData(): Observable<Array<Parent>> { return this._parentData.asObservable(); }

    private _allParentsData: ReplaySubject<Array<Student>> = new ReplaySubject(1);

    get getAllParentsData(): Observable<Array<Student>> { return this._allParentsData.asObservable(); }

    private _classParentsData: ReplaySubject<Array<Student>> = new ReplaySubject(1);

    get getClassParentsData(): Observable<Array<Student>> { return this._classParentsData.asObservable(); }



    private _filterParents: ReplaySubject<Filter> = new ReplaySubject(1);
    get getfilterParents(): Observable<Filter> { return this._filterParents.asObservable(); }


    constructor(private studentApiService: StudentApiService,
        private notificationService: NotificationService,
        private spinnerService: SpinnerService) {
    }

    public filterParents(filter: Filter) {
        this._filterParents.next(filter);
    }


    public getStudentsBySchoolId(): void {

        const schoolInfoId = Context.getSchoolId();
        this.studentApiService.getAllStudentBySchool(schoolInfoId.toString()).subscribe((result: Array<Student>) => {
            if (!!result && result.length > 0) {
                this._studentData.next(result);
            } else {
                this._studentData.next(null);
            }
        }, (error: any) => {
            this.spinnerService.hide();
            this.notificationService.show(error);
            this._studentData.error('Could not fetch student list please try again');
        });
    }

    public saveStudent(student: Student): Observable<Student> {

        return new Observable((subscriber: Subscriber<any>) => {
            student.SchoolInfoId = Context.getSchoolId();
            student.UpdatedEmail = Context.getUserName();
            this.studentApiService.insertUpdateStudent(student).subscribe((result: Student) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not save student please try again');
            });
        });
    }




    public getStudentById(studentId: number): Observable<Student> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.studentApiService.getStudentByid(studentId.toString()).subscribe((result: Student) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not fetch student please try again');
            });
        });
    }



    public getAllParents(): void {

        const schoolInfoId = Context.getSchoolId();
        this.studentApiService.getAllStudentWithParents(schoolInfoId.toString()).subscribe((result: Array<Student>) => {
            if (!!result) {
                this._allParentsData.next(result);
            } else {
                this._allParentsData.next(null);
            }
        }, (error: any) => {
            this.spinnerService.hide();
            this.notificationService.show(error);
            this._allParentsData.error('Could not fetch student list alont with patents please try again');
        });

    }

    public getParentsByStudentId(studentId: number): void {

        this.studentApiService.getStudentParentsById(studentId.toString()).subscribe((result: Array<Parent>) => {
            if (!!result) {
                this._parentData.next(result);
            } else {
                this._parentData.next(null);
            }
        }, (error: any) => {
            this.spinnerService.hide();
            this.notificationService.show(error);
            this._parentData.error('Could not fetch parent list please try again');
        });

    }

    public getParentsByClassId(classId: number): void {

        const schoolInfoId = Context.getSchoolId();
        this.studentApiService.getAllStudentWithParents(schoolInfoId.toString()).subscribe((result: Array<Student>) => {
            if (!!result) {
                result = result.filter((item) => item.ClassId === classId);
                this._classParentsData.next(result.reverse());
            } else {
                this._classParentsData.next(null);
            }
        }, (error: any) => {
            this.spinnerService.hide();
            this.notificationService.show(error);
            this._classParentsData.error('Could not fetch student list alont with patents please try again');
        });

    }



    public updateAppCode(studentAppCode: StudentAppCode): Observable<StudentAppCode> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.studentApiService.updateAppCode(studentAppCode).subscribe((result: StudentAppCode) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not save student app code please try again');
            });
        });
    }


    public saveParent(parent: Parent): Observable<Student> {

        return new Observable((subscriber: Subscriber<any>) => {
            parent.UpdatedEmail = Context.getUserName();
            this.studentApiService.insertUpdateStudentParent(parent).subscribe((result: Student) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                // subscriber.error('Could not save parent please try again');
            });
        });
    }

    public sendRemindMailToParent(parentId: string): Observable<boolean> {

        return new Observable((subscriber: Subscriber<any>) => {
            this.studentApiService.remindmail(parentId).subscribe((result: boolean) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                // subscriber.error('Could not save parent please try again');
            });
        });
    }

    public sendAppCodeMailToParent(studentId: string): Observable<boolean> {

        return new Observable((subscriber: Subscriber<any>) => {
            this.studentApiService.sendappcode(studentId).subscribe((result: boolean) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                // subscriber.error('Could not save parent please try again');
            });
        });
    }

    public getAllParentBySchoolId(): Observable<Parent[]> {
        return new Observable((subscriber: Subscriber<any>) => {

            const schoolInfoId = Context.getSchoolId();
            this.studentApiService.getAllParentBySchool(schoolInfoId.toString()).subscribe((result: Array<Student>) => {
                if (!!result && result.length > 0) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not fetch student list please try again');
            });
        });
    }

    public insertSecondStudentToParent(studentId: number, parentId: number): Observable<boolean> {
        const model = {
            'StudentId': studentId,
            'ParentId': parentId
        };
        return new Observable((subscriber: Subscriber<any>) => {
            this.studentApiService.insertSecondStudentToParent(model).subscribe((result: boolean) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                // subscriber.error('Could not save parent please try again');
            });
        });
    }

}
