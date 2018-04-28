import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { StaffBasicInfo } from '../../model/staff';
import { BaseServiceApi } from './../base/base.service';
import { jsObject } from '../../model/jsobject';
@Injectable()
export class StaffApiService extends BaseServiceApi {

    public getAllStaffBySchoolInfoId(schoolId: number): Observable<jsObject> {
        this.httpParams = new HttpParams()
            .set('schoolInfoId', schoolId.toString());
        return this.httpClient.get<jsObject>(this.baseUrl + 'staff/getallstaffbyschoolinfoid',
            { params: this.httpParams, headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }

    public insertUpdateStaff(staffModel: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'staff/insertupdatestaff', staffModel, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    public getStaffBasicInfoById(staffId: string): Observable<object> {

        this.httpParams = new HttpParams();
        const param = this.httpParams.set('staffId', staffId);
        return this.httpClient.get<object>(this.baseUrl + 'staff/getstaffbasicinfobystaffid', { params: param })
            .pipe(catchError(this.handleError));
    }


    public insertUpdateStaffOtherInfo(staffModel: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'staff/insertupdatestaffotherinfo', staffModel, this.httpOptions)
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
        return this.httpClient.post(this.baseUrl + 'staff/insertupdatestaffExperience', staffExperience, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    public getStaffExperienceInfobyStaffId(staffId: string): Observable<object> {
        this.httpParams = new HttpParams();
        const param = this.httpParams.set('staffId', staffId);
        return this.httpClient.get<object>(this.baseUrl + 'staff/getstaffexperienceinfobystaffid', { params: param })
            .pipe(catchError(this.handleError));
    }

    public insertStaffClass(staffClass: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'staff/insertupdatestaffclass', staffClass, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    public getstaffallclassbystaffid(staffId: string): Observable<object> {
        this.httpParams = new HttpParams();
        const param = this.httpParams.set('staffId', staffId);
        return this.httpClient.get<object>(this.baseUrl + 'staff/getstaffallclassbystaffid', { params: param })
            .pipe(catchError(this.handleError));
    }

    public insertStaffDoc(staffDocument: jsObject): Observable<jsObject> {
        return this.httpClient.post(this.baseUrl + 'staff/insertstaffdoc', staffDocument, this.httpOptions)
            .pipe(catchError(this.handleError));
    }


    public getStaffallDocByStaffId(staffId: string): Observable<object> {
        this.httpParams = new HttpParams();
        const param = this.httpParams.set('staffId', staffId);
        return this.httpClient.get<object>(this.baseUrl + 'staff/getstaffalldocbystaffid', { params: param })
            .pipe(catchError(this.handleError));
    }

    public deleteStaffDocByDocid(documentId: string): Observable<boolean> {
        this.httpParams = new HttpParams()
            .set('staffDocId', documentId);
        return this.httpClient.get<boolean>(this.baseUrl + 'staff/deletestaffdocbydocid', { params: this.httpParams })
            .pipe(catchError(this.handleError));
    }





}
