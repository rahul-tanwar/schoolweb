import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceApi } from './../../school-api/user/user.service';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { User } from '../../model/user';
import { error } from 'protractor';
import { BaseServiceApi } from '../../school-api/base/base.service';
import { Context } from '../../../shared/context';
import { StateMachineService } from '../state-machine/state-machine.service';

@Injectable()
export class UserService {

    constructor(private userServiceApi: UserServiceApi,
        private baseServiceApi: BaseServiceApi,
        private stateMachineService: StateMachineService
    ) {

    }



    public currentUser: User;
    private isLoginUser = false;

    public initilizeCurrentUser(result: User): void {
        this.baseServiceApi.initilizeBaseApi(result.access_token);
        this.currentUser = result;
        this.isLoginUser = true;
        Context.setContext(result);
    }

    public clearUser(): void {
        localStorage.removeItem('user-access');
        this.currentUser = null;
        this.isLoginUser = false;
    }

    checkIfUserIsAdmin(user: User) {
        debugger;
        if (user.RoleName === 'SuperAdmin') {
            this.stateMachineService.setDisableNavForAdmin.next(true);
        }
    }

    public getUser(user: User): Observable<any> {
        return new Observable((subscriber: Subscriber<any>) => {
            this.userServiceApi.getToken(user).subscribe((result: User) => {
                if (!!result) {
                    this.checkIfUserIsAdmin(result);
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


