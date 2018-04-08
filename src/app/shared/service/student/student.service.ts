import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { Student, StudentAppCode, StudentPatent } from '../../model/student';
import { StudentApiService } from '../../school-api/student/student-api.service';
import { Context } from '../../../shared/context';

@Injectable()
export class StudentService {

    private _studentData: ReplaySubject<Array<Student>> = new ReplaySubject(1);

    get studentData(): Observable<Array<Student>> { return this._studentData.asObservable(); }

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

            this.studentApiService.insertUpdateStudent(student).subscribe((result: Student) => {
                if (!!result) {
                    console.log(JSON.stringify(result));

                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                subscriber.error('Could not save student please try again');
            });
        });
    }




    public getStudentById(studentId: string): Observable<Student> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.studentApiService.getStudentByid(studentId).subscribe((result: Student) => {
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



    public getAllStudentWithParents(schoolInfoId: string): Observable<Array<StudentPatent>> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.studentApiService.getAllStudentWithParents(schoolInfoId).subscribe((result: Array<StudentPatent>) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                subscriber.error('Could not fetch student list alont with patents please try again');
            });
        });
    }

    public getParentsByStudentId(studentId: string): Observable<StudentPatent> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.studentApiService.getStudentParentsById(studentId).subscribe((result: StudentPatent) => {
                if (!!result) {

                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                subscriber.error('Could not fetch parent list please try again');
            });
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

}
