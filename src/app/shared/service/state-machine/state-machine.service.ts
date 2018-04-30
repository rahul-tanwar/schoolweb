import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class StateMachineService {

    public setDisableNavByUserRole: ReplaySubject<any> = new ReplaySubject(1);

    public getDisableNavByUserRole(): Observable<any> {
        return this.setDisableNavByUserRole.asObservable();
    }

}
