import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Parent } from '../../../shared/model/parent';
import { StudentService } from '../../../shared/service/student/student.service';
import { BaseComponent } from '../../base/base.component';
import { MultimediaFile } from '../../../shared/model/mutimedia';
import { SchoolBasicInfo, SchoolInfo } from '../../../shared/model/school';

@Component({
    selector: 'app-add-parent',
    templateUrl: './add-parent.component.html',
    styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent extends BaseComponent implements OnInit {

    public parent: Parent;
    public allParentList: Array<string>;
    public filterParentList: Array<string>;
    private selectedParent = 0;
    private patents: Parent[] = [];
    public parentModel: string;

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

        this.getAllParents();
    }

    private createAutocompleteData(parents: Parent[]) {
        this.allParentList = parents.map((parent: Parent) => {
            return parent.FirstName + parent.LastName + ' (' + parent.Email + ')';
        });
        this.filterParentList = this.allParentList;
    }


    public filterData(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.filterParentList = this.allParentList.filter((school) => school.toLowerCase().indexOf(filterValue) > -1);
    }


    public selectparent(event: any) {
        if (event.source.selected) {
            const selectedParent = this.patents.filter((parent: Parent) =>
                (event.source.value.indexOf(parent.Email) > -1)
            );
            if (selectedParent.length > 0) {
                this.selectedParent = selectedParent[0].StudentParentId;
            }
        }

    }

    public saveSecondStudent(): void {
        if (this.selectedParent > 0) {
            this.services.spinnerService.show();
            this.services.studentService
                .insertSecondStudentToParent(this.parent.StudentId, this.selectedParent).subscribe((result) => {
                    if (result) {
                        this.services.spinnerService.hide();
                        this.services.notificationService.show('Successfully saved');
                        this.dialogRef.close(result);
                    }
                });
        } else {
            this.services.notificationService.show('Please select parent first');
        }

    }


    private getAllParents(): void {
        this.services.studentService.getAllParentBySchoolId().subscribe((result) => {
            if (!!result) {
                this.patents = result;
                this.createAutocompleteData(result);
            }
        });
    }

    public save(): void {
        this.services.spinnerService.show();
        this.services.studentService.saveParent(this.parent).subscribe((result) => {
            if (result) {
                this.services.spinnerService.hide();
                this.services.notificationService.show('Successfully saved');
                this.dialogRef.close(result);
            }
        });

    }
    public cancel(): void {
        this.dialogRef.close();
    }
}
