import { Component, OnInit, Injector } from '@angular/core';
import { StateMachineService } from '../../shared/service/state-machine/state-machine.service';
import { Context } from '../../shared/context';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-sidebar-nav',
    templateUrl: './sidebar-nav.component.html',
    styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent extends BaseComponent implements OnInit {

    public isDisable = false;
    public schoolId: number;
    public selectSchool: number;
    public schoolList = [];
    constructor(private injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.schoolId = Context.getSchoolId();
        this.disableNavLinksBasedOnUserRole();
        this.getAllSchools();
    }

    private getAllSchools() {
        this.subscribeSchoolData();
        this.services.schoolService.getSchoolList();
    }

    private subscribeSchoolData(): void {

        this.services.schoolService.schoolData.subscribe((result) => {
            this.schoolList = result;
        });
    }

    private disableNavLinksBasedOnUserRole() {
        this.services.stateMachineService.getDisableNavForAdmin().subscribe((result: boolean) => {
            this.isDisable = result;
        });
    }

    public changeSchool(schoolId: number) {
        console.log(schoolId);

    }


}
