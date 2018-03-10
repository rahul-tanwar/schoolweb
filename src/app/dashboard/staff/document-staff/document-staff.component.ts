import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddDocumentComponent } from "./add-document/add-document.component";

@Component({
  selector: 'app-document-staff',
  templateUrl: './document-staff.component.html',
  styleUrls: ['./document-staff.component.css']
})
export class DocumentStaffComponent implements OnInit {
  displayedColumns = ['name','value','attachemnt','manualVerification','verifiedBy'];
  dataSource = new MatTableDataSource<Parent>(PARENT_DATA);
  animal: string;
  name: string;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(AddDocumentComponent, {
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
  name: string;
  value: string;
  attachment: string;
  manualVerification:string;
  verifiedBy?: string;
}

const PARENT_DATA: Parent[] = [
  {name: 'Aadhar card', value: 'ER23ER343', attachment:'assets/img/aadhar-card.jpg',manualVerification:'YES',verifiedBy:'Rohan' },
  {name: 'Voter ID', value: 'ERER343', attachment:'assets/img/voter-id-card.png',manualVerification:'NO',verifiedBy:'Mohan' },
  {name: 'Aadhar card', value: 'ER23ER343', attachment:'assets/img/aadhar-card.jpg',manualVerification:'YES',verifiedBy:'Rohan' },
  {name: 'Voter ID', value: 'ERER343', attachment:'assets/img/voter-id-card.png',manualVerification:'NO',verifiedBy:'Mohan' },
];

