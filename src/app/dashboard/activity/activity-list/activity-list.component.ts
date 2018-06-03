import { Component, OnInit, Input, Injector } from '@angular/core';
import { ListType } from '../../../shared/model/parent';
import { Activity } from '../../../shared/model/activity';
import { BaseComponent } from '../../base/base.component';
import * as moment from 'moment';

export class AcitivitieGroup {
    public date: moment.Moment;
    public activities: Activity[];
}

export enum FaClass {
    'fa-camera' = 1,
    'fa-cutlery' = 2,
    'fa-book' = 3,
    'fa-child' = 4,
    'fa-sticky-note' = 5,
    'fa-bed' = 6
}

@Component({
    selector: 'app-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent extends BaseComponent implements OnInit {

    constructor(public injector: Injector) {
        super(injector);
    }



    @Input() id = 0;
    @Input() type: ListType;
    public activities: Activity[] = [];
    public acitivitieGroup: AcitivitieGroup[] = [];
    public acitivitieGroup1: AcitivitieGroup[] = []; // FIXME
    public faClass = FaClass;
    public fromdate: moment.Moment = null;
    public todate: moment.Moment = null;

    ngOnInit() {
        this.loadActivities();
    }


    private loadActivities() {
        switch (this.type) {
            case ListType.Class:
                this.loadClassActivities();
                break;

            case ListType.Student:
                this.loadStudentActivities();
                break;
            default:
                break;
        }
    }

    private loadClassActivities() {
        this.services.activityService.getClassActivities(this.id as any).subscribe((result) => {
            if (!!result) {
                this.activities = result.reverse();
                this.groupActivityData();
            }
            this.services.spinnerService.hide();
        });
    }

    private loadStudentActivities() {
        this.services.activityService.getStudentActivities(this.id as any).subscribe((result) => {
            if (!!result) {
                this.activities = result.reverse();
                this.groupActivityData();
            }
            this.services.spinnerService.hide();
        });
    }

    private groupActivityData() {
        this.activities.forEach((activity: Activity) => {
            const index = this.acitivitieGroup.findIndex((item) => moment(item.date).isSame(moment(activity.ActivityDate), 'day'));
            if (index > -1) {
                this.acitivitieGroup[index].activities.push(activity);
            } else {
                this.acitivitieGroup.push({
                    date: activity.ActivityDate,
                    activities: [activity]
                });
            }
        });
        this.acitivitieGroup1 = this.acitivitieGroup;
    }

    public filterData(): void {
        this.acitivitieGroup = this.acitivitieGroup1;
        if (!!this.fromdate) {

            this.acitivitieGroup = this.acitivitieGroup1.filter((item) => moment(item.date).isSameOrAfter(moment(this.fromdate), 'day'));
        }
        if (!!this.acitivitieGroup && !!this.todate) {
            this.acitivitieGroup = this.acitivitieGroup.filter((item) => moment(item.date).isSameOrBefore(this.todate, 'day'));
        }
    }
}
