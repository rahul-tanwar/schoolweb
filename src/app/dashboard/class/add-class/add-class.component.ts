import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClassService } from '../../../shared/service/class/class.service';
import { Class } from '../../../shared/model/class';

@Component({
    selector: 'app-add-class',
    templateUrl: './add-class.component.html',
    styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

    public classModel = new Class();

    constructor(public dialogRef: MatDialogRef<AddClassComponent>,
        private classService: ClassService) { }

    ngOnInit() {
    }


    public save(): void {
        debugger;
        this.classService.saveClass(this.classModel).subscribe((result) => {
            this.classService.getAllClasses();
            this.dialogRef.close('successfully');
            alert('successfully save');
        });
    }

}
