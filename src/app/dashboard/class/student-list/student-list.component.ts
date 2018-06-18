
import { OnInit, Input, Component, ViewChild, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AddStudentClassComponent } from '../add-student-class/add-student-class.component';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../../shared/service/class/class.service';
import { Student } from '../../../shared/model/student';
import { StudentClassModel } from '../../../shared/model/class';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']
})
export class StudentListComponent extends BaseComponent implements OnInit {

    @Input() public classId: number;

    constructor(public dialog: MatDialog,
        private injector: Injector) {
        super(injector);
    }

    displayedColumns = ['select', 'name'];
    dataSource: MatTableDataSource<Student>;
    selection = new SelectionModel<Student>(true, []);
    studentList: Array<Student>;

    isRemoveButtonVisible = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.subscribeStudentData();
    }

    private subscribeStudentData() {
        this.services.classService.getAllStudentByClassId(this.classId);
        this.services.classService.studentsByClassData.subscribe((students: Array<Student>) => {
            if (!!students) {
                this.dataSource = new MatTableDataSource<Student>(students.reverse());
                this.dataSource.paginator = this.paginator;
                this.studentList = students;
                this.isRemoveButtonVisible = false;
            }

        });
    }


    openDialog(): void {
        const dialogRef = this.dialog.open(AddStudentClassComponent, {
            width: '500px',
            data: { classId: this.classId, studentList: this.studentList }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.services.classService.getAllStudentByClassId(this.classId);
            this.services.studentService.getParentsByClassId(this.classId);
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    public removeStudents(): void {
        this.services.confirmService.open(() => {
            const studentList = this.studentList.filter((item: Student) => item.isSelected === true);
            if (!!studentList) {
                const obj = new StudentClassModel();
                obj.ClassId = this.classId;
                obj.StudentIds = studentList.map(item => item.StudentId);
                this.services.classService.removeStudentFromClass(obj).subscribe((item) => {
                    this.services.classService.getAllStudentByClassId(this.classId);
                    this.services.studentService.getParentsByClassId(this.classId);
                    this.services.notificationService.show('Successfully remove from class');
                });
            }
        });
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
