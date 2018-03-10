
import { OnInit } from '@angular/core';
import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {



  displayedColumns = ['name'];
  dataSource = new MatTableDataSource<Student>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(StudentListComponent, {
      width: '500px'
     // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    //  this.animal = result;
    });
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}


export interface Student {
  name: string;
  age: number;
  class: number;
  aadhar: string;
}

const ELEMENT_DATA: Student[] = [
  { age: 2, name: 'Rohan Sharma', class: 4, aadhar: 'He'},
  {age: 3, name: 'Nilesh Tanwar', class: 6, aadhar: 'Li'},
  {age: 4, name: 'Rahul Sharma', class: 9, aadhar: 'Be'},
  {age: 5, name: 'Pankaj Tak', class: 1, aadhar: 'B'},
  {age: 1, name: 'Jai Soni', class: 1, aadhar: 'H'},
  {age: 6, name: 'Mohit Tanwar', class: 12, aadhar: 'C'},
  {age: 7, name: 'Avinash Sharma', class: 1, aadhar: 'N'},
  {age: 8, name: 'Pratik soni', class: 1, aadhar: 'O'},
  {age: 9, name: 'Shriram Sharma', class: 1, aadhar: 'F'},
  {age: 10, name: 'Tejeswani Soni', class: 2, aadhar: 'Ne'},
  {age: 11, name: 'Gautham Sharma', class: 2, aadhar: 'Na'},
  {age: 12, name: 'Aniket Tanwar', class: 2, aadhar: 'Mg'},
  {age: 13, name: 'Avishak Tanwar', class: 2, aadhar: 'Al'},
];