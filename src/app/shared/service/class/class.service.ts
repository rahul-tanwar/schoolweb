import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { Class, StudentClassModel } from '../../model/class';
import { Student } from '../../model/student';
import { ClassServiceApi } from '../../school-api/class/class.service';
import { Context } from '../../../shared/context';

@Injectable()
export class ClassService {

    private _classData: ReplaySubject<Array<Class>> = new ReplaySubject(1);

    get classData(): Observable<Array<Class>> { return this._classData.asObservable(); }

    private _studentsByClassId: ReplaySubject<Array<Student>> = new ReplaySubject(1);

    get studentsByClassData(): Observable<Array<Student>> { return this._studentsByClassId.asObservable(); }


    constructor(private classServiceApi: ClassServiceApi) {

    }

    public getAllClasses(): void {
        const schoolId = Context.getSchoolId();
        this.classServiceApi.getAllClassBySchoolId(schoolId).subscribe((result: Array<Class>) => {
            if (!!result) {
                this._classData.next(result);
            } else {
                this._classData.next(null);
            }
        }, (error: any) => {

            this._classData.error('Could not fetch school info please try again');
        });
    }

    public getAllStudentByClassId(classId: number): void {

        this.classServiceApi.getAllStudentByClassId(classId).subscribe((result: Array<Student>) => {
            if (!!result) {
                this._studentsByClassId.next(result);
            } else {
                this._studentsByClassId.next(null);
            }
        }, (error: any) => {
            this._studentsByClassId.error('Could not fetch school info please try again');
        });
    }

    public saveClass(classModel: Class): Observable<boolean> {
        classModel.SchoolInfoId = Context.getSchoolId();
        return new Observable((subscriber: Subscriber<any>) => {
            this.classServiceApi.insertUpdateclass(classModel).subscribe((result: Array<Class>) => {
                if (!!result) {
                    subscriber.next(true);
                } else {
                    subscriber.next(false);
                }
            }, (error: any) => {
                subscriber.error('Could not fetch school info please try again');
            });
        });
    }

    public removeStudentFromClass(studentClassModel: StudentClassModel): Observable<boolean> {
        return new Observable((subscriber: Subscriber<any>) => {
            this.classServiceApi.removeStudentClass(studentClassModel).subscribe((result: StudentClassModel) => {
                if (!!result) {
                    subscriber.next(true);
                } else {
                    subscriber.next(false);
                }
            }, (error: any) => {
                subscriber.error('Could not fetch school info please try again');
            });
        });
    }

    public updateStudentClass(studentClassModel: StudentClassModel): Observable<boolean> {
        return new Observable((subscriber: Subscriber<any>) => {
            this.classServiceApi.updateStudentClass(studentClassModel).subscribe((result: boolean) => {
                if (!!result) {
                    subscriber.next(true);
                } else {
                    subscriber.next(false);
                }
            }, (error: any) => {
                subscriber.error('Could not fetch school info please try again');
            });
        });
    }

    public getAllParentsByClassId(classId: number) {

    }
}

