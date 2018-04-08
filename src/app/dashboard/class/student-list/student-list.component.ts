
import { OnInit, Input } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AddStudentClassComponent } from '../add-student-class/add-student-class.component';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../../shared/service/class/class.service';
import { Student } from '../../../shared/model/student';
import { StudentClassModel } from '../../../shared/model/class';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

    @Input() public classId: number;

    constructor(public dialog: MatDialog, private classService: ClassService) { }

    displayedColumns = ['select', 'name'];
    dataSource: MatTableDataSource<Student>;
    selection = new SelectionModel<Student>(true, []);
    studentList: Array<Student>;
    isRemoveButtonVisible = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.classService.getAllStudentByClassId(this.classId);
        this.subscribeStudentData();
    }

    private subscribeStudentData() {
        this.classService.studentsByClassData.subscribe((students: Array<Student>) => {
            this.dataSource = new MatTableDataSource<Student>(students.reverse());
            this.dataSource.paginator = this.paginator;
            this.studentList = students;
            this.isRemoveButtonVisible = false;
        });
    }


    openDialog(): void {
        const dialogRef = this.dialog.open(AddStudentClassComponent, {
            width: '500px',
            data: { classId: this.classId }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.classService.getAllStudentByClassId(this.classId);
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    public removeStudents(): void {
        const studentList = this.studentList.filter((item: Student) => item.isSelected === true);
        if (!!studentList) {
            const obj = new StudentClassModel();
            obj.ClassId = this.classId;
            obj.StudentIds = studentList.map(item => item.StudentId);
            this.classService.removeStudentFromClass(obj).subscribe((item) => {
                this.classService.getAllStudentByClassId(this.classId);
            });
        }
    }

    public onSelect() {
        const selectedStudent = this.studentList.filter((item) => item.isSelected === true);
        if (!!selectedStudent && !!selectedStudent.length) {
            this.isRemoveButtonVisible = true;
        } else {
            this.isRemoveButtonVisible = false;
        }
    }

    // /** Whether the number of selected elements matches the total number of rows. */
    // isAllSelected() {
    //     const numSelected = this.selection.selected.length;
    //     const numRows = this.dataSource.data.length;
    //     return numSelected === numRows;
    // }

    // /** Selects all rows if they are not all selected; otherwise clear selection. */
    // masterToggle() {
    //     this.isAllSelected() ?
    //         this.selection.clear() :
    //         this.dataSource.data.forEach(row => this.selection.select(row));
    // }

}
