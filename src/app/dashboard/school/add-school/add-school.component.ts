import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SchoolBasicInfo } from '../../../shared/model/school';
import { SchoolService } from '../../../shared/service/school/school.service';

@Component({
    selector: 'app-add-school',
    templateUrl: './add-school.component.html',
    styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

    public schoolBasicInfo = new SchoolBasicInfo();

    constructor(public dialogRef: MatDialogRef<AddSchoolComponent>,
        private schoolService: SchoolService) { }

    ngOnInit() {
    }

    public save(): void {
        this.schoolService.saveBasicInfo(this.schoolBasicInfo).subscribe((result) => {
            this.schoolService.getSchoolList();
            this.dialogRef.close('successfully');
            alert('successfully save');
        });
    }

    public cancel(): void {
        this.dialogRef.close();
    }

}
