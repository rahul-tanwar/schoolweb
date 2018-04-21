import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../shared/service/spinner/spinner.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerService.hide();
    }

}
