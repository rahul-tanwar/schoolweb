import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseServiceApi } from './../base/base.service';
import { jsObject } from '../../model/jsobject';

@Injectable()
export class UserServiceApi extends BaseServiceApi {

    constructor(protected httpClient: HttpClient) {
        super();
    }

    public getToken(user: object): Observable<object> {

        const httpOptions = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        });
        this.httpParams = new HttpParams()
            .set('username', user['UserName'])
            .set('password', user['password'])
            .set('grant_type', 'password');
        return this.httpClient.post('http://schoolapi.anaghaenterprises.in/token',
            this.httpParams)
            .pipe(catchError(this.handleError));
    }

    public getadminprofile(userId: string): Observable<jsObject> {

        this.httpParams = new HttpParams()
            .set('userId', userId);
        return this.httpClient.get<jsObject>(this.baseUrl + 'userprofile/getadminprofile', {
            params: this.httpParams
        }).pipe(catchError(this.handleError));
    }

    public updateAdminprofile(userProfile: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'userprofile/updateadminprofile', userProfile)
            .pipe(catchError(this.handleError));
    }

    public changeProfilePassword(userChangePassword: jsObject): Observable<boolean> {
        return this.httpClient.post(this.baseUrl + 'userprofile/changeprofilePassword', userChangePassword)
            .pipe(catchError(this.handleError));
    }

}
