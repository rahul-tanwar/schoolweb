import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class StateMachineService {

    public setDisableNavForAdmin: ReplaySubject<boolean> = new ReplaySubject(1);

    public getDisableNavForAdmin(): Observable<boolean> {
        return this.setDisableNavForAdmin.asObservable();
    }

}
