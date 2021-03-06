import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';



export class BaseServiceApi {

    protected token: any;

    protected baseUrl = 'http://18.222.251.49/kidojoapi/api/';

    protected httpParams: HttpParams;

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
            if (error.status === 401) {
                window.top.location.href = '/';
            }
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            error.error);
    }

}
