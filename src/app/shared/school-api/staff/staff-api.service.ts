import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { StaffBasicInfo } from '../../model/staff';
import { BaseServiceApi } from './../base/base.service';
import { jsObject } from '../../model/jsobject';
@Injectable()
export class StaffApiService extends BaseServiceApi {

    constructor(protected httpClient: HttpClient) {
        super();
    }
    public getAllStaffBySchoolInfoId(schoolId: number): Observable<jsObject> {
        this.httpParams = new HttpParams()
            .set('schoolInfoId', schoolId.toString());
        return this.httpClient.get<jsObject>(this.baseUrl + 'staff/getallstaffbyschoolinfoid',
            { params: this.httpParams })
            .pipe(catchError(this.handleError));
    }

    public insertUpdateStaff(staffModel: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'staff/insertupdatestaff', staffModel)
            .pipe(catchError(this.handleError));
    }

    public getStaffBasicInfoById(staffId: string): Observable<object> {

        this.httpParams = new HttpParams();
        const param = this.httpParams.set('staffId', staffId);
        return this.httpClient.get<object>(this.baseUrl + 'staff/getstaffbasicinfobystaffid', { params: param })
            .pipe(catchError(this.handleError));
    }


    public insertUpdateStaffOtherInfo(staffModel: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'staff/insertupdatestaffotherinfo', staffModel)
            .pipe(catchError(this.handleError));
    }

    public getStaffOtherInfoByStaffId(staffId: string): Observable<object> {
        //   return Observable.of();
        this.httpParams = new HttpParams();
        const param = this.httpParams.set('staffId', staffId);
        return this.httpClient.get<object>(this.baseUrl + 'staff/getstaffotherinfobystaffid', { params: param })
            .pipe(catchError(this.handleError));
    }


    public insertUpdateStaffExperience(staffExperience: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'staff/insertupdatestaffExperience', staffExperience)
            .pipe(catchError(this.handleError));
    }

    public getStaffExperienceInfobyStaffId(staffId: string): Observable<object> {
        this.httpParams = new HttpParams();
        const param = this.httpParams.set('staffId', staffId);
        return this.httpClient.get<object>(this.baseUrl + 'staff/getstaffexperienceinfobystaffid', { params: param })
            .pipe(catchError(this.handleError));
    }

    public insertStaffClass(staffClass: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'staff/insertupdatestaffclass', staffClass)
            .pipe(catchError(this.handleError));
    }

    public getstaffallclassbystaffid(staffId: string): Observable<object> {
        this.httpParams = new HttpParams();
        const param = this.httpParams.set('staffId', staffId);
        return this.httpClient.get<object>(this.baseUrl + 'staff/getstaffallclassbystaffid', { params: param })
            .pipe(catchError(this.handleError));
    }

    public insertStaffDoc(staffDocument: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'staff/insertstaffdoc', staffDocument)
            .pipe(catchError(this.handleError));
    }


    public getStaffallDocByStaffId(staffId: string): Observable<object> {
        this.httpParams = new HttpParams();
        const param = this.httpParams.set('staffId', staffId);
        return this.httpClient.get<object>(this.baseUrl + 'staff/getstaffalldocbystaffid', { params: param })
            .pipe(catchError(this.handleError));
    }

    public deleteStaffDocByDocid(documentId: string): Observable<boolean> {
        return this.httpClient.post(this.baseUrl + 'staff/deletestaffdocbydocid', documentId)
            .pipe(catchError(this.handleError));
    }

    public deleteStaffExperienceById(experienceId: string): Observable<boolean> {
        return this.httpClient.post(this.baseUrl + 'staff/deletestaffexpbyid', experienceId)
            .pipe(catchError(this.handleError));
    }





}
