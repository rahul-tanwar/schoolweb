import { Injectable } from '@angular/core';
import { BaseServiceApi } from './../base/base.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { jsObject } from '../../model/jsobject';

@Injectable()
export class StudentApiService extends BaseServiceApi {


    public insertUpdateStudentParent(parent: jsObject): Observable<jsObject> {

        return this.httpClient.post(this.baseUrl + 'student/insertupdatestudentparent', parent, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    public updateAppCode(studentAppCode: jsObject): Observable<jsObject> {

        return this.httpClient.post(this.baseUrl + 'student/updateappcode', studentAppCode, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    public getAllStudentWithParents(schoolInfoId: string): Observable<jsObject> {

        this.httpParams = new HttpParams()
            .set('schoolInfoId', schoolInfoId);
        return this.httpClient.get<jsObject>(this.baseUrl + 'student/getallstudentwithparent', {
            params: this.httpParams,
            headers: this.httpOptions
        }).pipe(catchError(this.handleError));
    }

    public getStudentParentsById(studentId: string): Observable<jsObject> {

        this.httpParams = new HttpParams()
            .set('studentId', studentId);
        return this.httpClient.get<jsObject>(this.baseUrl + 'student/getstudentparentbyid', {
            params: this.httpParams,
            headers: this.httpOptions
        }).pipe(catchError(this.handleError));
    }


    public getStudentByid(studentId: string): Observable<jsObject> {
        debugger;
        this.httpParams = new HttpParams()
            .set('studentId', studentId);
        return this.httpClient.get<jsObject>(this.baseUrl + 'student/getstudentbyid', {
            params: this.httpParams,
            headers: this.httpOptions
        })
            .pipe(catchError(this.handleError));
    }

    public getAllStudentBySchool(schoolInfoId: string): Observable<jsObject> {
        this.httpParams = new HttpParams()
            .set('schoolInfoId', schoolInfoId);
        return this.httpClient.get<object>(this.baseUrl + 'student/getallstudentbyschoolinfoid', {
            params: this.httpParams,
            headers: this.httpOptions
        })
            .pipe(catchError(this.handleError));
    }

    public insertUpdateStudent(student: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'student/insertupdatestudent', student, this.httpOptions)
            .pipe(catchError(this.handleError));
    }


}
