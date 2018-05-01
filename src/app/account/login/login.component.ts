import { Component, OnInit, Injector } from '@angular/core';
import { User } from '../../shared/model/user';
import { Router } from '@angular/router';
import { BaseComponent } from '../../dashboard/base/base.component';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

    public user = new User();

    constructor(private injector: Injector, private router: Router) {
        super(injector)
    }

    ngOnInit() {
    }


    public login(): void {
        this.services.spinnerService.show();
        this.services.userService.getUser(this.user).subscribe((result: boolean) => {
            if (result) {
                this.services.spinnerService.hide();
                this.router.navigate(['dashboard']);
            }
        });
    }

}
