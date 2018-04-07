import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SchoolService } from '../../../shared/service/school/school.service';
import { SchoolBasicInfo, SchoolOtherInfo, SchoolInfo } from '../../../shared/model/school';
@Component({
    selector: 'app-school-details',
    templateUrl: './school-details.component.html',
    styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {
    public schoolUniqueId: string;
    public schoolBasicInfo: SchoolBasicInfo = new SchoolBasicInfo();
    public schoolOtherInfo: SchoolOtherInfo = new SchoolOtherInfo();

    constructor(private route: ActivatedRoute, private schoolService: SchoolService, private changeDetectorRef: ChangeDetectorRef) { }

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
        this.schoolService.getSchoolInfo(this.schoolUniqueId).subscribe((result: SchoolInfo) => {
            if (!!result) {
                this.schoolBasicInfo = result.schoolBasicInfo;
                this.schoolOtherInfo = result.schoolOtherInfo;
                this.changeDetectorRef.detectChanges();
            }
        });
    }


}
