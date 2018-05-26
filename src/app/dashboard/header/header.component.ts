import { Component, OnInit, Injector, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/service/user/user.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { Subscription } from 'Rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit, OnDestroy {

    username: string;
    public breadCrumb: string;
    private readonly subscription = new Subscription();
    constructor(private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.subscribeBreadCrumbs();
        this.username = this.services.userService.currentUser.UserName;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    private subscribeBreadCrumbs(): void {
        this.subscription.add(
            this.services.stateMachineService.getsetBreadCrumb().subscribe((result) => {
                this.breadCrumb = result;
            }));
    }

    public logout(): void {
        this.services.userService.clearUser();
        this.router.navigate(['']);
    }

}
