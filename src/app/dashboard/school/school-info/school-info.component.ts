import { Component, OnInit, Input, Inject, ChangeDetectorRef, Injector } from '@angular/core';
import { SchoolBasicInfo } from '../../../shared/model/school';
import { SchoolService } from '../../../shared/service/school/school.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../shared/service/spinner/spinner.service';
import { BaseComponent } from '../../base/base.component';
@Component({
    selector: 'app-school-info',
    templateUrl: './school-info.component.html',
    styleUrls: ['./school-info.component.css']
})
export class SchoolInfoComponent extends BaseComponent implements OnInit {

    // public schoolBasicInfo: SchoolBasicInfo = new SchoolBasicInfo();

    @Input() public schoolBasicInfo: SchoolBasicInfo;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private injector: Injector
    ) {
        super(injector);

    }

    ngOnInit() {

    }

    public save(): void {
        this.services.spinnerService.show();
        this.services.schoolService.saveBasicInfo(this.schoolBasicInfo).subscribe((result) => {
            this.services.spinnerService.hide();
            this.services.notificationService.show('successfully saved');
        });
    }

    public cancel(): void {
        this.router.navigateByUrl('/dashboard/school');
    }

}
