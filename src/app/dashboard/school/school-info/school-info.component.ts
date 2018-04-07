import { Component, OnInit, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { SchoolBasicInfo } from '../../../shared/model/school';
import { SchoolService } from '../../../shared/service/school/school.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-school-info',
    templateUrl: './school-info.component.html',
    styleUrls: ['./school-info.component.css']
})
export class SchoolInfoComponent implements OnInit {

    // public schoolBasicInfo: SchoolBasicInfo = new SchoolBasicInfo();

    @Input() public schoolBasicInfo: SchoolBasicInfo;

    constructor(public schoolService: SchoolService, private changeDetectorRef: ChangeDetectorRef) {


    }

    ngOnInit() {

    }

    public save(): void {
        this.schoolService.saveBasicInfo(this.schoolBasicInfo).subscribe((result) => {
            alert('successfully save');
        });
    }

}
