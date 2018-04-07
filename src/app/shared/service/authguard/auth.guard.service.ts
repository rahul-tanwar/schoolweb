// import { Injectable } from '@angular/core';
// import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AccountService } from '../account/account.service';

// @Injectable()
// export class AuthGuardService implements CanActivate, CanActivateChild {

//     constructor(private accountService: AccountService, private router: Router) {

//     }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//         //     let url: string = state.url;
//         //   console.log('Url:'+ url);
//         if (this.accountService.isUserLoggedIn()) {
//             return true;
//         }
//         // this.authService.setRedirectUrl(url);
//         // this.router.navigate([ this.authService.getLoginUrl() ]);
//         return false;
//     }
//     canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//         const loggedInUser = this.accountService.getLoggedInUser();
//         if (loggedInUser.role === 'ADMIN') {
//             return true;
//         } else {
//             console.log('Unauthorized to open link: ' + state.url);
//             return false;
//         }
//     }
// }
