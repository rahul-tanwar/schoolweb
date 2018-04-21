
import { OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddParentComponent } from './add-parent/add-parent.component';
import { StudentService } from '../../shared/service/student/student.service';
import { StudentParents, Parent, ListType } from '../../shared/model/parent';

@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {


    @Input() studentId: number;
    public filter: string;
    public listType = ListType;
    constructor() { }

    ngOnInit() {

    }

}
