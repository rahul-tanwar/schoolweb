import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseServiceApi } from './../base/base.service';


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
            .set('username', user['userName'])
            .set('password', user['password'])
            .set('grant_type', 'password');
        return this.httpClient.post('http://schoolapi.anaghaenterprises.in/token',
            this.httpParams)
            .pipe(catchError(this.handleError));
    }

}
