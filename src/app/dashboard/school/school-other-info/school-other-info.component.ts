import { Component, OnInit, Input, Injector } from '@angular/core';
import { SchoolOtherInfo } from '../../../shared/model/school';
import { SchoolService } from '../../../shared/service/school/school.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
@Component({
    selector: 'app-school-other-info',
    templateUrl: './school-other-info.component.html',
    styleUrls: ['./school-other-info.component.css']
})
export class SchoolOtherInfoComponent extends BaseComponent implements OnInit {

    @Input() public schoolOtherInfo: SchoolOtherInfo = new SchoolOtherInfo();

    constructor(
        private router: Router,
        private injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        console.log(this.schoolOtherInfo);

    }


    public save(): void {
        this.services.spinnerService.show();
        this.services.schoolService.saveOtherInfo(this.schoolOtherInfo).subscribe((result) => {
            this.services.spinnerService.hide();
            this.services.notificationService.show('successfully saved');
        });
    }
    public cancel(): void {
        this.router.navigateByUrl('/dashboard/school');
    }
}
