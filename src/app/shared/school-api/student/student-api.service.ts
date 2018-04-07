import { Injectable } from '@angular/core';
import { BaseServiceApi } from './../base/base.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class StudentApiService extends BaseServiceApi {


    public getSchoolBasicInfoById(schoolUniqueId: string): Observable<object> {

        this.httpParams = new HttpParams();
        const param = this.httpParams.set('schoolUniqueId', schoolUniqueId);
        return this.httpClient.get<object>(this.baseUrl + 'school/getschoolinfobyuniqueid', { params: param })
            .pipe(catchError(this.handleError));
    }

    public getSchoolOtherInfoById(schoolUniqueId: string): Observable<object> {

        this.httpParams = new HttpParams();
        const param = this.httpParams.set('schoolUniqueId', schoolUniqueId);
        return this.httpClient.get<object>(this.baseUrl + 'school/getschoolotherInfobyuniqueid', {
            params: param,
            headers: this.httpOptions
        })
            .pipe(catchError(this.handleError));
    }

    public getAllSchoolList(): Observable<object> {
        return this.httpClient.get<object>(this.baseUrl + 'school/getallschoollist', this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    public saveBasicInfo(schoolInfo: object): Observable<object> {
        return this.httpClient.post(this.baseUrl + 'school/insertupdateschool', schoolInfo, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    public saveOtherInfo(schoolInfo: object): Observable<object> {
        return this.httpClient.post(this.baseUrl + 'school/instupdschoolotherinfo', schoolInfo, this.httpOptions)
            .pipe(catchError(this.handleError));
    }


}
