import { Component, OnInit, Injector } from '@angular/core';
import { StateMachineService } from '../../shared/service/state-machine/state-machine.service';
import { Context } from '../../shared/context';
import { BaseComponent } from '../base/base.component';
import { SchoolBasicInfo } from '../../shared/model/school';
import { log } from 'util';


@Component({
    selector: 'app-sidebar-nav',
    templateUrl: './sidebar-nav.component.html',
    styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent extends BaseComponent implements OnInit {

    public isSuperAdmin = true;
    public isAdmin = true;
    public schoolId: number;
    public selectedSchool: string;
    public schoolList = [];
    public autocompleteList: Array<string>;
    public autocompleteList2: Array<string>;
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

        this.services.schoolService.schoolData.subscribe((result: SchoolBasicInfo[]) => {
            this.schoolList = result;
            this.createAutocompleteData(result);
        });
    }

    public createAutocompleteData(schools: SchoolBasicInfo[]) {
        this.autocompleteList = schools.map((school: SchoolBasicInfo) => {
            return school.Name + ' (' + school.SchoolUniqueId + ')';
        });
        this.autocompleteList2 = this.autocompleteList;
    }

    private disableNavLinksBasedOnUserRole() {
        this.services.stateMachineService.getDisableNavByUserRole().subscribe((result: { role: string, value: boolean }) => {
            if (result.role === 'SuperAdmin') {
                this.isSuperAdmin = result.value;
                this.isAdmin = true;
            } else {
                this.isAdmin = result.value;
            }
        });
    }

    public changeSchool(schoolId: number) {
        console.log(schoolId);

    }

    public selectSchool(event: any) {
        if (event.source.selected) {
            const school = this.schoolList.filter((schoolitem: SchoolBasicInfo) =>
                (event.source.value.indexOf(schoolitem.SchoolUniqueId) > -1)
            );
            if (school.length > 0) {
                this.services.userService.updateSchoolForAdmin(school[0].SchoolInfoId);
            }
        }
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
