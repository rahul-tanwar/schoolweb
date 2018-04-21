import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ISpinnerState, SpinnerService } from '../../service/spinner/spinner.service';

@Component({
    selector: 'app-spinner',
    styles: [`
  .overlay{
    position:fixed; width: 100%; height: 100%;background:rgba(0,0,0,0.3); top:0; left:0; z-index: 2;
  }
  `],
    template: `<div *ngIf="visible" class="overlay">
  <i class="fa fa-spinner"></i>
  </div>`
})

export class SpinnerComponent implements OnInit, OnDestroy {
    visible = false;
    isOverlay = false;

    private spinnerStateChanged: Subscription;

    constructor(private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerStateChanged = this.spinnerService.spinnerState
            .subscribe((state: ISpinnerState) => {
                this.visible = state.show;
                this.isOverlay = state.showOverlay;
            });
    }

    ngOnDestroy() {
        if (this.spinnerStateChanged) {
            this.spinnerStateChanged.unsubscribe();
        }
    }
}
