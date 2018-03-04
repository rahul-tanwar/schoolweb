import { OnInit } from '@angular/core';
import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SchoolInfoComponent } from "./school-info/school-info.component";
@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  displayedColumns = ['schoolId','schoolName','city','board','schoolType','status'];
  dataSource = new MatTableDataSource<School>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) { }
  openDialog(): void {
    let dialogRef = this.dialog.open(SchoolInfoComponent, {
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
interface School {
  schoolId: number;
  schoolName:string;
  city:string;
  board:string;
  schoolType:string;
  status:boolean;

}

const ELEMENT_DATA: School[] = [
  {schoolId: 1, schoolName: 'Alpha School', city: 'Pune', board: 'CBSE',schoolType:'Pre School',status:true},
  {schoolId: 2, schoolName: 'Sunrise School', city: 'Jaipur', board: 'RBSE',schoolType:'Pre School',status:true},
  {schoolId: 3, schoolName: 'Delhi Public School', city: 'Pune', board: 'CBSE',schoolType:'Pre School',status:true},
  {schoolId: 4, schoolName: 'Lexicon School', city: 'Pune', board: 'CBSE',schoolType:'Pre School',status:true},
  {schoolId: 5, schoolName: 'Sathya School', city: 'Ajmer', board: 'RBSE',schoolType:'Pre School',status:true},
  {schoolId: 6, schoolName: 'Sunrise School', city: 'Pune', board: 'CBSE',schoolType:'Pre School',status:true}
];