import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Parent } from '../../../shared/model/parent';
import { StudentService } from '../../../shared/service/student/student.service';

@Component({
    selector: 'app-add-parent',
    templateUrl: './add-parent.component.html',
    styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent implements OnInit {

    public parent: Parent;

    constructor(
        public dialogRef: MatDialogRef<AddParentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private studentService: StudentService
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit() {
        this.parent = this.data.parent;
    }

    public save(): void {

        this.studentService.saveParent(this.parent).subscribe((result) => {
            if (result) {
                this.dialogRef.close(result);
                alert('successfully save');
            }
        });

    }

}
