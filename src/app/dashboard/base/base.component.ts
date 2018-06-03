import { Component, ChangeDetectorRef, Injector, ReflectiveInjector, Inject } from '@angular/core';
import * as Services from '../../shared/service/index';

interface IService {
    spinnerService: Services.SpinnerService;
    classService: Services.ClassService;
    notificationService: Services.NotificationService;
    studentService: Services.StudentService;
    staffService: Services.StaffService;
    stateMachineService: Services.StateMachineService;
    schoolService: Services.SchoolService;
    userService: Services.UserService;
    activityService: Services.ActivityService;
}

export class BaseComponent {

    protected services: IService;
    protected changeDetector: ChangeDetectorRef;

    constructor(injector: Injector) {

        this.services = {
            spinnerService: injector.get(Services.SpinnerService),
            classService: injector.get(Services.ClassService),
            notificationService: injector.get(Services.NotificationService),
            studentService: injector.get(Services.StudentService),
            staffService: injector.get(Services.StaffService),
            stateMachineService: injector.get(Services.StateMachineService),
            schoolService: injector.get(Services.SchoolService),
            userService: injector.get(Services.UserService),
            activityService: injector.get(Services.ActivityService)
        };
    }

    protected detectChanges() {
        this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
    }

}

