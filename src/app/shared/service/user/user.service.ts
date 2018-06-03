import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceApi } from './../../school-api/user/user.service';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { User, UserProfile, UserChangePassword } from '../../model/user';
import { Context } from '../../../shared/context';
import { StateMachineService } from '../state-machine/state-machine.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class UserService {

    constructor(private userServiceApi: UserServiceApi,
        private stateMachineService: StateMachineService,
        private router: Router,
        private notificationService: NotificationService,
        private spinnerService: SpinnerService
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
        this.router.navigate(['dashboard']).then(() => {
            window.location.reload();
        });
    }

    public isUserLoggedIn(): boolean {
        return this.isLoginUser;
    }

    public getLoggedInUser(): any {
        return null;
    }

    public getUserById(userId: number): Observable<UserProfile> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.userServiceApi.getadminprofile(userId.toString()).subscribe((result: UserProfile) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not fetch User please try again');
            });
        });
    }

    public updateUserProfile(userProfile: UserProfile): Observable<UserProfile> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.userServiceApi.updateAdminprofile(userProfile).subscribe((result: UserProfile) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not fetch User please try again');
            });
        });
    }

    public updateUserPassword(userChangePassword: UserChangePassword): Observable<boolean> {

        return new Observable((subscriber: Subscriber<any>) => {
            userChangePassword.UserId = Context.getUserId();
            this.userServiceApi.changeProfilePassword(userChangePassword).subscribe((result: boolean) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(false);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not update user password please try again');
            });
        });
    }

}


