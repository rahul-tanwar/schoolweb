import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceApi } from './../../school-api/user/user.service';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { User } from '../../model/user';
import { error } from 'protractor';
import { BaseServiceApi } from '../../school-api/base/base.service';

@Injectable()
export class UserService {

    constructor(private userServiceApi: UserServiceApi, private baseServiceApi: BaseServiceApi) {

    }



    public currentUser: User;
    private isLoginUser = false;

    public initilizeCurrentUser(result: User): void {
        this.baseServiceApi.initilizeBaseApi(result.access_token);
        this.currentUser = result;
        this.isLoginUser = true;
    }

    public clearUser(): void {
        localStorage.removeItem('user-access');
        this.currentUser = null;
        this.isLoginUser = false;
    }

    public getUser(user: User): Observable<any> {
        return new Observable((subscriber: Subscriber<any>) => {
            this.userServiceApi.getToken(user).subscribe((result: User) => {
                if (!!result) {
                    debugger;
                    localStorage.setItem('user-access', JSON.stringify(result));
                    this.initilizeCurrentUser(result);
                    subscriber.next(true);
                } else {
                    subscriber.next(false);
                }
            }, (error1: any) => {
                subscriber.error('Could not fetch token');
            });

        });
    }

    public isUserLoggedIn(): boolean {
        return this.isLoginUser;
    }

    public getLoggedInUser(): any {
        return null;
    }

}


