import { Injectable } from '@angular/core';
import { BaseServiceApi } from './../base/base.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ClassServiceApi extends BaseServiceApi {


    public getAllClassist(): Observable<object> {
        return this.httpClient.get<object>(this.baseUrl + 'school/getallschoollist', this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    public saveClass(classModel: object): Observable<object> {
        return this.httpClient.post(this.baseUrl + 'school/insertupdateschool', classModel, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    public deleteClass(classModel: object) {
        return this.httpClient.post(this.baseUrl + 'school/insertupdateschool', classModel, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
}
