import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


@Injectable()
export class BaseServiceApi {

    protected token: any;

    protected httpOptions: any;

    protected baseUrl = 'http://schoolapi.anaghaenterprises.in/api/';

    protected httpParams: HttpParams;

    constructor(protected httpClient: HttpClient) {
    }

    public initilizeBaseApi(token: string): void {

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + token
            })
        };
    }

    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    }

}