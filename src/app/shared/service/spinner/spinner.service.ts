import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

export interface ISpinnerState {
    show: boolean;
    showOverlay: boolean;
}

@Injectable()
export class SpinnerService {
    private spinnerSubject = new Subject<ISpinnerState>();

    spinnerState: Observable<ISpinnerState> = this.spinnerSubject.asObservable();

    show(showOverlay = false) {
        this.spinnerSubject.next(<ISpinnerState>{ show: true, showOverlay: showOverlay });
    }

    hide() {
        this.spinnerSubject.next(<ISpinnerState>{ show: false, showOverlay: false });
    }
}
