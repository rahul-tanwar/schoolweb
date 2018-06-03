import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';
import { ActivityApiService } from '../../school-api/activity/activity.service';
import { NotificationService } from '../notification/notification.service';
import { SpinnerService } from '../spinner/spinner.service';
import { Activity } from '../../model/activity';

@Injectable()
export class ActivityService {

    constructor(public activityApiService: ActivityApiService,
        private notificationService: NotificationService,
        private spinnerService: SpinnerService) { }


    public getClassActivities(classId: string): Observable<Activity[]> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.activityApiService.getclassActivities(classId).subscribe((result: Activity[]) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not fetch activities please try again');
            });
        });
    }

    public getStudentActivities(studentId: string): Observable<Activity[]> {

        return new Observable((subscriber: Subscriber<any>) => {

            this.activityApiService.getstudentActivities(studentId).subscribe((result: Activity[]) => {
                if (!!result) {
                    subscriber.next(result);
                } else {
                    subscriber.next(null);
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.notificationService.show(error);
                subscriber.error('Could not fetch activities please try again');
            });
        });
    }



}
