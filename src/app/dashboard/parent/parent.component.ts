
import { OnInit } from '@angular/core';
import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddParentComponent } from './add-parent/add-parent.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {



  displayedColumns = ['STUDENT', 'PARENTS', 'SIGN UP', 'CHECK-IN CODE'];
  dataSource = new MatTableDataSource<Student>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  foods = [
    {value: 'steak-0', viewValue: 'Class 1'},
    {value: 'pizza-1', viewValue: 'Class 2'},
    {value: 'tacos-2', viewValue: 'Class 3'},
    {value: 'steak-0', viewValue: 'Class 4'},
    {value: 'pizza-1', viewValue: 'Class 5'},
    {value: 'tacos-2', viewValue: 'Class 6'}
  ];

  constructor(public dialog: MatDialog) {}


  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddParentComponent, {
      width: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
 interface Parent {
  name: string;

}


export interface Student {
  name: string;
  age: number;
  class: number;
  aadhar: string;
  parents?: Parent[];
}

const ELEMENT_DATA: Student[] = [
  { age: 2, name: 'Rohan Sharma', class: 4, aadhar: 'He', parents: [ { name: 'Rahul Sharma'}, {name: 'Rani Sharma'} ] },
  {age: 3, name: 'Nilesh Tanwar', class: 6, aadhar: 'Li', parents: [ { name: 'Ronak Tanwar'}, {name: 'Shalini Tanwar'} ] },
  {age: 4, name: 'Rahul Sharma', class: 9, aadhar: 'Be'},
  {age: 5, name: 'Pankaj Tak', class: 1, aadhar: 'B'},
  {age: 1, name: 'Jai Soni', class: 1, aadhar: 'H', parents: [ { name: 'Mike Soni'}, {name: 'Soniya Soni'} ] },
  {age: 6, name: 'Mohit Tanwar', class: 12, aadhar: 'C' , parents: [ { name: 'Rahul Tanwar'}, {name: 'Rani Tanwar'} ] },
  {age: 7, name: 'Avinash Sharma', class: 1, aadhar: 'N'},
  {age: 8, name: 'Pratik soni', class: 1, aadhar: 'O'},
  {age: 9, name: 'Shriram Sharma', class: 1, aadhar: 'F'},
  {age: 10, name: 'Tejeswani Soni', class: 2, aadhar: 'Ne'},
  {age: 11, name: 'Gautham Sharma', class: 2, aadhar: 'Na'},
  {age: 12, name: 'Aniket Tanwar', class: 2, aadhar: 'Mg'},
  {age: 13, name: 'Avishak Tanwar', class: 2, aadhar: 'Al'},
];

