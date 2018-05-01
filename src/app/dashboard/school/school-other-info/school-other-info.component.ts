import { Component, OnInit, Input, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SchoolOtherInfo } from '../../../shared/model/school';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { MultimediaFile } from '../../../shared/model/mutimedia';
import { scheduleMicroTask } from '@angular/core/src/util';
@Component({
    selector: 'app-school-other-info',
    templateUrl: './school-other-info.component.html',
    styleUrls: ['./school-other-info.component.css']
})
export class SchoolOtherInfoComponent extends BaseComponent implements OnInit {

    // @Input() public schoolOtherInfo: SchoolOtherInfo
    private _schoolOtherInfo = new SchoolOtherInfo();
    @Input()
    set schoolOtherInfo(schoolOtherInfo: SchoolOtherInfo) {
        if (schoolOtherInfo) {
            const file = new MultimediaFile();
            file.id = 'schoolLogoId';
            file.labelName = 'Upload School Logo';
            file.required = false;
            this._schoolOtherInfo = schoolOtherInfo;
            this._schoolOtherInfo.MultimediaFile = file;
            console.log(schoolOtherInfo.LogoURL);
        }
    }
    get schoolOtherInfo() {
        return this._schoolOtherInfo;
    }
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
