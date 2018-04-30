import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceApi } from './../../school-api/user/user.service';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { User } from '../../model/user';
import { error } from 'protractor';
import { Context } from '../../../shared/context';
import { StateMachineService } from '../state-machine/state-machine.service';

@Injectable()
export class UserService {

    constructor(private userServiceApi: UserServiceApi,
        private stateMachineService: StateMachineService
    ) {

    }



    public currentUser: User;
    private isLoginUser = false;

    public initilizeCurrentUser(result: User): void {
        this.currentUser = result;
        this.isLoginUser = true;
        Context.setContext(result);
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

    updateSchoolForAdmin(schoolId: number) {
        const user: User = JSON.parse(localStorage.getItem('user-access'));
        user.SchoolInfoId = schoolId;
        localStorage.setItem('user-access', JSON.stringify(user));
        this.initilizeCurrentUser(user);
        this.stateMachineService.setDisableNavByUserRole.next({ role: 'SuperAdmin', value: true });
    }

    // public isUserLoggedIn(): boolean {
    //     //  return this.isLoginUser;
    //     return false;
    // }

    public getLoggedInUser(): any {
        return null;
    }

}


