import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Parent } from '../../../shared/model/parent';
import { StudentService } from '../../../shared/service/student/student.service';
import { BaseComponent } from '../../base/base.component';
import { MultimediaFile } from '../../../shared/model/mutimedia';

@Component({
    selector: 'app-add-parent',
    templateUrl: './add-parent.component.html',
    styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent extends BaseComponent implements OnInit {

    public parent: Parent;

    constructor(
        public dialogRef: MatDialogRef<AddParentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private injector: Injector) {
        super(injector);
        this.parent = this.data.parent;

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {


    }

    public save(): void {
        debugger;
        this.services.spinnerService.show();
        this.services.studentService.saveParent(this.parent).subscribe((result) => {
            if (result) {
                this.services.spinnerService.hide();
                this.services.notificationService.show('Successfully saved');
                this.dialogRef.close(result);
            }
        });

    }

}
