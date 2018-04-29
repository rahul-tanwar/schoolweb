import { Component, OnInit, Input, Injector } from '@angular/core';
import { SchoolOtherInfo } from '../../../shared/model/school';
import { SchoolService } from '../../../shared/service/school/school.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
@Component({
    selector: 'app-school-settings',
    templateUrl: './school-settings.component.html',
    styleUrls: ['./school-settings.component.css']
})
export class SchoolSettingsComponent extends BaseComponent implements OnInit {

    @Input() public schoolOtherInfo: SchoolOtherInfo;


    constructor(
        private router: Router,
        private injector: Injector) {
        super(injector);
    }

    ngOnInit() {
    }


    public save(): void {
        this.services.spinnerService.show();
        this.services.schoolService.saveOtherInfo(this.schoolOtherInfo).subscribe((result) => {
            this.services.spinnerService.hide();
            this.services.notificationService.show("Successfully saved.");
        });
    }

    public cancel(): void {
        this.router.navigateByUrl('/dashboard/school');
    }
}
