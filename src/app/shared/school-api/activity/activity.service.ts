import { Injectable } from '@angular/core';
import { BaseServiceApi } from './../base/base.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { jsObject } from '../../model/jsobject';

@Injectable()
export class ActivityApiService extends BaseServiceApi {

    constructor(protected httpClient: HttpClient) {
        super();
    }

    public getstudentActivities(studentId: string): Observable<jsObject> {

        this.httpParams = new HttpParams()
            .set('studentId', studentId);
        return this.httpClient.get<jsObject>(this.baseUrl + 'activity/getstudentActivities', {
            params: this.httpParams
        }).pipe(catchError(this.handleError));
    }

    public getclassActivities(classId: string): Observable<jsObject> {

        this.httpParams = new HttpParams()
            .set('classId', classId);
        return this.httpClient.get<jsObject>(this.baseUrl + 'activity/getclassActivities', {
            params: this.httpParams
        }).pipe(catchError(this.handleError));
    }


}
