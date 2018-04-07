import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddClassComponent } from './add-class/add-class.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  displayedColumns = ['name'];
  dataSource = new MatTableDataSource<Class>(ELEMENT_DATA);

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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddClassComponent, {
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


export interface Class {
  name: string;
  age: number;
  class: number;
  aadhar: string;
}

const ELEMENT_DATA: Class[] = [
  { age: 2, name: 'Class Nursery', class: 4, aadhar: 'He'},
  { age: 2, name: 'Class LKG', class: 4, aadhar: 'He'},
  { age: 2, name: 'Class HKG', class: 4, aadhar: 'He'},
  { age: 2, name: 'Class 1', class: 4, aadhar: 'He'},
  {age: 3, name: 'Class 2', class: 6, aadhar: 'Li'},
  {age: 4, name: 'Class 3', class: 9, aadhar: 'Be'},
  {age: 5, name: 'Class 4', class: 1, aadhar: 'B'},
  {age: 1, name: 'Class 5', class: 1, aadhar: 'H'},
  {age: 6, name: 'Class 6', class: 12, aadhar: 'C'},
  {age: 7, name: 'Class 7', class: 1, aadhar: 'N'},
  {age: 8, name: 'Class 8', class: 1, aadhar: 'O'},
  {age: 9, name: 'Class 9', class: 1, aadhar: 'F'},
  {age: 9, name: 'Class 10', class: 1, aadhar: 'F'},
  {age: 9, name: 'Class 11', class: 1, aadhar: 'F'},
  {age: 9, name: 'Class 12', class: 1, aadhar: 'F'},
];
