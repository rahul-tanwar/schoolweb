import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddParentComponent } from './../add-parent/add-parent.component';

@Component({
  selector: 'app-parent-details',
  templateUrl: './parent-details.component.html',
  styleUrls: ['./parent-details.component.css']
})
export class ParentDetailsComponent implements OnInit {
  displayedColumns = ['fname', 'email', 'mobile', 'sign-up'];
  dataSource = new MatTableDataSource<Parent>(PARENT_DATA);
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddParentComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  ngOnInit() {
  }

}

export interface Parent {
  fname: string;
  lname: string;
  email: string;
  mobile: string;
  phone2?: string;
}

const PARENT_DATA: Parent[] = [
  {fname: 'Rohan', lname: 'sharma', email: 'rohansharma@gmail.com', mobile: '77897345654' },
  {fname: 'Diya', lname: 'sharma', email: 'diyasharma@gmail.com', mobile: '77897345654' },
];
