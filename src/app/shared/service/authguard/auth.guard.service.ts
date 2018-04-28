import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../../model/user';
import { Context } from '../../context';
import { StateMachineService } from '../../service/state-machine/state-machine.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private userService: UserService,
        private router: Router,
        private stateMachineService: StateMachineService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.userService.isUserLoggedIn()) {
            return true;
        } else {
            const user: User = JSON.parse(localStorage.getItem('user-access'));
            if (!!user) {

                this.userService.initilizeCurrentUser(user);
                return this.checkUserIsAdmin(route, user);
            } else {
                this.router.navigate(['']);
            }
        }
        return false;
    }

    private checkUserIsAdmin(route: ActivatedRouteSnapshot, user: User): boolean {
        if (user.RoleName === 'SuperAdmin' && Context.getSchoolId() === 0) {
            this.stateMachineService.setDisableNavForAdmin.next(true);
            const url = window.location.href;
            if (url.includes('/dashboard/dashboardmain') || url.includes('/dashboard/school')) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const loggedInUser = this.userService.getLoggedInUser();
        if (loggedInUser.role === 'ADMIN') {
            return true;
        } else {
            console.log('Unauthorized to open link: ' + state.url);
            return false;
        }
    }
}
