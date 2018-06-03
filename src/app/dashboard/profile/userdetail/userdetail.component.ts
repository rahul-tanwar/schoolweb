import { Component, OnInit, Injector } from '@angular/core';
import { UserProfile } from '../../../shared/model/user';
import { BaseComponent } from '../../base/base.component';
import { Context } from '../../../shared/context';

@Component({
    selector: 'app-userdetail',
    templateUrl: './userdetail.component.html',
    styleUrls: ['./userdetail.component.css']
})
export class UserDetailComponent extends BaseComponent implements OnInit {

    public userProfile: UserProfile = new UserProfile();

    constructor(private injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.getUserData();
    }

    private getUserData(): void {
        this.services.spinnerService.show();
        this.services.userService.getUserById(Context.getUserId()).subscribe((result: UserProfile) => {
            if (!!result) {
                this.userProfile = result;
            }
            this.services.spinnerService.hide();
        });
    }

    public update(): void {
        this.services.spinnerService.show();
        this.services.userService.updateUserProfile(this.userProfile).subscribe((result) => {
            if (!!result) {
                this.services.notificationService.show('Successfully updated');
            }
            this.services.spinnerService.hide();
        });
    }

    public cancel(): void {

    }

}
