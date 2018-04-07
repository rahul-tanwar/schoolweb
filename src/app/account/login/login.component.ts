import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/user';
import { UserService } from '../../shared/service/user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public user = new User();

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
    }


    public login(): void {
        this.userService.getUser(this.user).subscribe((result: boolean) => {
            if (result) {
                this.router.navigate(['dashboard']);
            }
        });
    }

}
