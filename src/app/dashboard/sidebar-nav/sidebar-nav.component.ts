import { Component, OnInit, Injector } from '@angular/core';
import { StateMachineService } from '../../shared/service/state-machine/state-machine.service';
import { Context } from '../../shared/context';
import { BaseComponent } from '../base/base.component';
import { SchoolBasicInfo, SchoolInfo } from '../../shared/model/school';
import { log } from 'util';


@Component({
    selector: 'app-sidebar-nav',
    templateUrl: './sidebar-nav.component.html',
    styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent extends BaseComponent implements OnInit {

    public isSuperAdmin = true;
    public selectedSchool: string;
    public schoolList = [];
    public schoolId: number;
    public autocompleteList: Array<string>;
    public autocompleteList2: Array<string>;
    public schoolLogo: string;

    constructor(private injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.schoolId = Context.getSchoolId();
        this.schoolLogo = '../../../assets/img/new_logo.png';
        this.disableNavLinksBasedOnUserRole();
        this.subscribeAllSchools();
        this.getSchooinfo();
    }

    private getSchooinfo() {
        if (this.schoolId > 0) {
            this.services.schoolService.getSchoolInfoById(this.schoolId.toString()).subscribe((result: SchoolInfo) => {
                if (!!result) {
                    this.selectedSchool = result['SchoolBasicInfoModel'].Name + '(' + result['SchoolBasicInfoModel'].SchoolUniqueId + ')';
                    if (!!result['SchoolOtherInfoModel'] && !!result['SchoolOtherInfoModel'].logo) {
                        this.schoolLogo = result['SchoolOtherInfoModel'].logo;
                    }
                }
            });
        }
    }

    private subscribeAllSchools(): void {
        this.services.schoolService.getSchoolList();
        this.services.schoolService.schoolData.subscribe((result: SchoolBasicInfo[]) => {
            if (!!result) {
                this.schoolList = result;
                this.createAutocompleteData(result);
            }
        });
    }

    private createAutocompleteData(schools: SchoolBasicInfo[]) {
        this.autocompleteList = schools.map((school: SchoolBasicInfo) => {
            return school.Name + ' (' + school.SchoolUniqueId + ')';
        });
        this.autocompleteList2 = this.autocompleteList;
    }

    private disableNavLinksBasedOnUserRole() {

        if (this.schoolId > 0) {
            if (Context.getUserRole() === 'SuperAdmin') {
                this.isSuperAdmin = true;
            }
        }
    }

    public selectSchool(event: any) {
        if (event.source.selected) {
            const school = this.schoolList.filter((schoolitem: SchoolBasicInfo) =>
                (event.source.value.indexOf(schoolitem.SchoolUniqueId) > -1)
            );
            if (school.length > 0) {
                this.services.schoolService.setSuperAdminSchool(school[0].SchoolInfoId).subscribe((result) => {
                    this.services.userService.updateSchoolForAdmin(school[0].SchoolInfoId);
                });
            }
        }
    }

    public deleteSchool(): void {
        this.services.schoolService.deleteSuperAdminSchool().subscribe((result) => {
            this.services.userService.updateSchoolForAdmin(0);
        });
    }

    public filterData(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.autocompleteList = this.autocompleteList2.filter((school) => school.toLowerCase().indexOf(filterValue) > -1);
        if (this.autocompleteList.length === 1) {
            console.log();
        }
    }


}
