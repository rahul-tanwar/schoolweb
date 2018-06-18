import { Injectable } from '@angular/core';
import { Observable, Subscriber, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class ConfirmService {

    private _openConfirmPopup: ReplaySubject<any> = new ReplaySubject(1);

    constructor() { }



    public open(callback: () => any) {
        this._openConfirmPopup.next(callback);
    }

    public openConfirmPopup(): Observable<string> {
        return this._openConfirmPopup.asObservable();
    }

}
