import { Injectable } from '@angular/core';
import { BaseServiceApi } from './../base/base.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { jsObject } from '../../model/jsobject';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable()
export class ClassServiceApi extends BaseServiceApi {

    constructor(protected httpClient: HttpClient) {
        super();
    }

    public getAllClassBySchoolId(schoolId: number): Observable<jsObject> {
        this.httpParams = new HttpParams()
            .set('schoolInfoId', schoolId.toString());
        return this.httpClient.get<jsObject>(this.baseUrl + 'class/getallclassBySchoolInfoId',
            { params: this.httpParams })
            .pipe(catchError(this.handleError));
    }

    public insertUpdateclass(classModel: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'class/insertupdateclass', classModel)
            .pipe(catchError(this.handleError));
    }

    public getAllStudentByClassId(classId: number): Observable<jsObject> {
        this.httpParams = new HttpParams()
            .set('classId', classId.toString());
        return this.httpClient.get<jsObject>(this.baseUrl + 'class/getallstudentbyclassid',
            { params: this.httpParams })
            .pipe(catchError(this.handleError));
    }


    public updateStudentClass(studentClassModel: jsObject) {
        return this.httpClient.post(this.baseUrl + 'class/updatestudentclass', studentClassModel)
            .pipe(catchError(this.handleError));
    }


    public removeStudentClass(studentClassModel: jsObject) {
        return this.httpClient.post(this.baseUrl + 'class/removestudentclass', studentClassModel)
            .pipe(catchError(this.handleError));
    }


}
