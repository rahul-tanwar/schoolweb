import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { Student, StudentAppCode } from '../../model/student';
import { Parent, StudentParents } from '../../model/parent';
import { StudentApiService } from '../../school-api/student/student-api.service';
import { Context } from '../../../shared/context';

@Injectable()
export class StudentService {

    private _studentData: ReplaySubject<Array<Student>> = new ReplaySubject(1);

    get studentData(): Observable<Array<Student>> { return this._studentData.asObservable(); }

    private _parentData: ReplaySubject<Array<Parent>> = new ReplaySubject(1);

    get parentData(): Observable<Array<Parent>> { return this._parentData.asObservable(); }

    private _allParentsData: ReplaySubject<Array<StudentParents>> = new ReplaySubject(1);

    get getAllParentsData(): Observable<Array<StudentParents>> { return this._allParentsData.asObservable(); }

    private _classParentsData: ReplaySubject<Array<StudentParents>> = new ReplaySubject(1);

    get getClassParentsData(): Observable<Array<StudentParents>> { return this._classParentsData.asObservable(); }


    constructor(private studentApiService: StudentApiService) {
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
                subscriber.error('Could not fetch student please try again');
            });
        });
    }



    public getAllParents(): void {

        const schoolInfoId = Context.getSchoolId();
        this.studentApiService.getAllStudentWithParents(schoolInfoId.toString()).subscribe((result: Array<StudentParents>) => {
            if (!!result) {
                this._allParentsData.next(result);
            } else {
                this._allParentsData.next(null);
            }
        }, (error: any) => {
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
            this._parentData.error('Could not fetch parent list please try again');
        });

    }

    public getParentsByClassId(classId: number): void {

        const schoolInfoId = Context.getSchoolId();
        this.studentApiService.getAllStudentWithParents(schoolInfoId.toString()).subscribe((result: Array<StudentParents>) => {
            if (!!result) {
                result = result.filter((item) => item.StudentProfile.ClassId === classId);
                this._classParentsData.next(result);
            } else {
                this._classParentsData.next(null);
            }
        }, (error: any) => {
            this._classParentsData.error('Could not fetch student list alont with patents please try again');
        });

    }



    public updateAppCode(studentAppCode: StudentAppCode): Observable<StudentAppCode> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.studentApiService.updateAppCode(studentAppCode).subscribe((result: StudentAppCode) => {
                if (!!result) {
                    console.log(JSON.stringify(result));

                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
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
                subscriber.error('Could not save parent please try again');
            });
        });
    }

}
