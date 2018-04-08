import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/service/user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    username: string;
    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.username = this.userService.currentUser.UserName;
    }

    public logout(): void {
        this.userService.clearUser();
        this.router.navigate(['']);
    }

}
