import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseServiceApi } from './../base/base.service';


@Injectable()
export class UserServiceApi extends BaseServiceApi {

    public getToken(user: object): Observable<object> {

        this.httpOptions = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        });
        this.httpParams = new HttpParams()
            .set('username', user['userName'])
            .set('password', user['password'])
            .set('grant_type', 'password');
        return this.httpClient.post('http://schoolapi.anaghaenterprises.in/token',
            this.httpParams, this.httpOptions)
            .pipe(catchError(this.handleError));
    }



}
