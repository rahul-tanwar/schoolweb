import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ISpinnerState, SpinnerService } from '../../service/spinner/spinner.service';

@Component({
    selector: 'app-spinner',
    styles: [`
  .overlay{
    position:fixed; width: 100%; height: 100%;background:rgba(0,0,0,0.1); top:0; left:0; z-index: 9999;
  }
  .spinner-position {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
  }

  `],
    template: `<div *ngIf="visible" class="overlay">
    <mat-spinner class="spinner-position"></mat-spinner>
  </div>`
})

export class SpinnerComponent implements OnInit, OnDestroy {
    visible = false;

    private spinnerStateChanged: Subscription;

    constructor(private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerStateChanged = this.spinnerService.spinnerState
            .subscribe((state: ISpinnerState) => {
                this.visible = state.show;
            });
    }

    ngOnDestroy() {
        if (this.spinnerStateChanged) {
            this.spinnerStateChanged.unsubscribe();
        }
    }
}
