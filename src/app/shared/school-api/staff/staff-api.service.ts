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

  public getStaffBasicInfoById(staffInfoId: string): Observable<object> {

    this.httpParams = new HttpParams();
    const param = this.httpParams.set('staffId', staffInfoId);
    return this.httpClient.get<object>(this.baseUrl + 'staff/getstaffbasicinfobystaffid', { params: param })
      .pipe(catchError(this.handleError));
  }

}
