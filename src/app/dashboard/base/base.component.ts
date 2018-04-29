import { Component, ChangeDetectorRef, Injector, ReflectiveInjector } from '@angular/core';
import * as Services from '../../shared/service/index';

interface IService {
    spinnerService: Services.SpinnerService;
    classService: Services.ClassService;
    notificationService: Services.NotificationService;
    studentService: Services.StudentService;
    staffService: Services.StaffService;
    schoolService: Services.SchoolService;
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
            schoolService: injector.get(Services.SchoolService)
        };
        this.changeDetector = injector.get(ChangeDetectorRef);
    }

    protected detectChanges() {
        this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
    }

}

