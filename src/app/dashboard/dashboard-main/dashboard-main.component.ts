
import { OnInit, Injector } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-dashboard-main',
    templateUrl: './dashboard-main.component.html',
    styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent extends BaseComponent implements OnInit {

    ngOnInit(): void {
        this.services.stateMachineService.setBreadCrumb.next('Dashboard');
    }
    constructor(private injector: Injector) {
        super(injector);
    }

}

