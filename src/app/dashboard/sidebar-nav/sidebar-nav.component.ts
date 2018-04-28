import { Component, OnInit } from '@angular/core';
import { StateMachineService } from '../../shared/service/state-machine/state-machine.service';

@Component({
    selector: 'app-sidebar-nav',
    templateUrl: './sidebar-nav.component.html',
    styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

    public isDisable = false;

    constructor(private stateMachineService: StateMachineService) { }

    ngOnInit() {
        this.stateMachineService.getDisableNavForAdmin().subscribe((result: boolean) => {
            debugger;
            // this.isDisable = result;
        });
    }

}
