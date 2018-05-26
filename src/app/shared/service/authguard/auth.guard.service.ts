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
                return true;
            } else {
                this.router.navigate(['']);
            }
        }
        return false;
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
