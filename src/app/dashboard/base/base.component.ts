import { Component, ChangeDetectorRef, Injector, ReflectiveInjector } from '@angular/core';
import * as Services from '../../shared/service/index';

interface IService {
    spinnerService: any;
    classService: any;
    notificationService: any;
    studentService: any;
    staffService?: any;
}

export class BaseComponent {

    protected services: IService;
    protected detectChange: ChangeDetectorRef;

    constructor(injector: Injector) {

        this.services = {
            spinnerService: injector.get(Services.SpinnerService),
            classService: injector.get(Services.ClassService),
            notificationService: injector.get(Services.NotificationService),
            studentService: injector.get(Services.StudentService)
        };
        this.detectChange = injector.get(ChangeDetectorRef);
    }

    protected detectChanges() {
        this.detectChange.markForCheck();
        this.detectChange.detectChanges();
    }

}

