import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClassService } from '../../../shared/service/class/class.service';
import { Class } from '../../../shared/model/class';
import { MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'app-add-class',
    templateUrl: './add-class.component.html',
    styleUrls: ['./add-class.component.css']
})
export class AddClassComponent extends BaseComponent implements OnInit {

    public classModel = new Class();

    constructor(public dialogRef: MatDialogRef<AddClassComponent>,
        private classService: ClassService,
        private matSnackBar: MatSnackBar,
        public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
    }


    public save(): void {
        debugger;
        this.services.classService.saveClass(this.classModel).subscribe((result) => {
            this.classService.getAllClasses();
            this.matSnackBar.open('successfully', '', {
                duration: 2000
            });
            this.dialogRef.close('successfully');
        });
    }

}
