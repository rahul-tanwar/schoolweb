import { OnInit, AfterViewInit, ChangeDetectorRef, Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SchoolService } from '../../../shared/service/school/school.service';
import { SchoolBasicInfo, SchoolOtherInfo, SchoolInfo } from '../../../shared/model/school';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'app-school-details',
    templateUrl: './school-details.component.html',
    styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent extends BaseComponent implements OnInit {
    public schoolUniqueId: string;
    public schoolBasicInfo: SchoolBasicInfo = new SchoolBasicInfo();
    public schoolOtherInfo: SchoolOtherInfo = new SchoolOtherInfo();

    constructor(private route: ActivatedRoute,
        private schoolService: SchoolService,
        private changeDetectorRef: ChangeDetectorRef,
        public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.subscribeRouteParams().then(() => {
            this.getSchoolInfo();
        });

    }

    private subscribeRouteParams(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.route.params.subscribe(params => {
                this.schoolUniqueId = params['id'];
                resolve(true);
            }, (error) => {
                reject(false);
            }
            );
        });
    }

    private getSchoolInfo() {
        this.schoolService.getSchoolInfo(this.schoolUniqueId);
        this.schoolService.schoolInfo.subscribe((result: SchoolInfo) => {
            if (!!result) {
                this.schoolBasicInfo = result.schoolBasicInfo;
                this.schoolOtherInfo = result.schoolOtherInfo;
                this.services.stateMachineService.setBreadCrumb.next('School / ' + this.schoolBasicInfo.Name);
            }
        });
    }


}
