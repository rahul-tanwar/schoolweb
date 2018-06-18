
import { OnInit, Input, Output, EventEmitter, ChangeDetectorRef, Injector } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddParentComponent } from './add-parent/add-parent.component';
import { StudentService } from '../../shared/service/student/student.service';
import { Parent, ListType } from '../../shared/model/parent';
import { Filter } from '../../shared/model/filter';
import { Class } from '../../shared/model/class';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    styleUrls: ['./parent.component.css']
})
export class ParentComponent extends BaseComponent implements OnInit {


    @Input() public studentId: number;
    public filter = new Filter();
    public listType = ListType;
    classList: Array<Class>;

    constructor(private injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.subscribeClassData();
    }

    private subscribeClassData(): void {
        this.services.classService.getAllClasses();
        this.services.classService.classData.subscribe((result: Array<Class>) => {
            this.classList = result;
        });
    }

    public filterData(event: boolean): void {
        this.services.spinnerService.show();
        if (event) {
            this.filter.serachKeyword = '';
        }
        this.services.studentService.filterParents(this.filter);
    }

}
