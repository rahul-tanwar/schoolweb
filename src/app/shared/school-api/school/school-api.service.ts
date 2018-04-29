import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SchoolBasicInfo } from '../../model/school';
import { BaseServiceApi } from './../base/base.service';

@Injectable()
export class SchoolServiceApi extends BaseServiceApi {

    constructor(protected httpClient: HttpClient) {
        super();
    }
    public getSchoolBasicInfoById(schoolUniqueId: string): Observable<object> {

        this.httpParams = new HttpParams();
        const param = this.httpParams.set('schoolUniqueId', schoolUniqueId);
        return this.httpClient.get<object>(this.baseUrl + 'school/getschoolinfobyuniqueid', { params: param })
            .pipe(catchError(this.handleError));
    }

    public getSchoolOtherInfoById(schoolUniqueId: string): Observable<object> {

        this.httpParams = new HttpParams();
        const param = this.httpParams.set('schoolUniqueId', schoolUniqueId);
        return this.httpClient.get<object>(this.baseUrl + 'school/getschoolotherInfobyuniqueid', { params: param })
            .pipe(catchError(this.handleError));
    }

    public getAllSchoolList(): Observable<object> {
        return this.httpClient.get<object>(this.baseUrl + 'school/getallschoollist')
            .pipe(catchError(this.handleError));
    }

    public saveBasicInfo(schoolInfo: object): Observable<object> {
        return this.httpClient.post(this.baseUrl + 'school/insertupdateschool', schoolInfo)
            .pipe(catchError(this.handleError));
    }

    public saveOtherInfo(schoolInfo: object): Observable<object> {
        return this.httpClient.post(this.baseUrl + 'school/instupdschoolotherinfo', schoolInfo)
            .pipe(catchError(this.handleError));
    }



}
