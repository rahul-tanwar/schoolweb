import { Component, OnInit, Injector } from '@angular/core';
import { UserChangePassword } from '../../../shared/model/user';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.css']
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {
    public userChangePassword: UserChangePassword = new UserChangePassword();
    public oldHide = true;
    public newHide = true;
    public confirmHide = true;

    constructor(private injector: Injector) {
        super(injector);
    }


    ngOnInit() {
    }

    public update(): void {
        this.services.spinnerService.show();
        this.services.userService.updateUserPassword(this.userChangePassword).subscribe((result: boolean) => {
            if (result) {
                this.services.notificationService.show('Successfully changed');
            }
            this.services.spinnerService.hide();
        });
    }

    public cancel(): void {

    }

}
