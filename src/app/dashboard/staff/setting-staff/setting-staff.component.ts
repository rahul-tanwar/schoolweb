import { Component, OnInit, Input, Injector } from '@angular/core';
import { StaffClass } from '../../../shared/model/staff';
import { BaseComponent } from '../../base/base.component';
import { Class } from '../../../shared/model/class';
import { Router } from '@angular/router';
@Component({
    selector: 'app-setting-staff',
    templateUrl: './setting-staff.component.html',
    styleUrls: ['./setting-staff.component.css']
})
export class SettingStaffComponent extends BaseComponent implements OnInit {

    @Input() public staffClass: StaffClass;
    public classList: Array<Class>;

    constructor(private injector: Injector,
        private router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.subscribeClassData();
        this.services.classService.getAllClasses();
    }

    private subscribeClassData(): void {
        this.services.classService.classData.subscribe((result: Array<Class>) => {
            this.classList = result;
        });
    }


    public save(): void {
        this.services.staffService.saveStaffClass(this.staffClass).subscribe((result) => {
            alert('successfully save');
        });
    }
    public cancel(): void {
        this.router.navigateByUrl('/dashboard/staff');
    }

}
