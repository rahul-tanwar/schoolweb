import { Component, OnInit, Input, Injector, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StaffExperience } from '../../../shared/model/staff';
import { BaseComponent } from '../../base/base.component';
import { AddCertificateExperienceComponent } from './add-certificate-experience/add-certificate-experience.component';

@Component({
    selector: 'app-experience-certificate-info',
    templateUrl: './experience-certificate-info.component.html',
    styleUrls: ['./experience-certificate-info.component.css']
})
export class ExperienceCertificateInfoComponent extends BaseComponent implements OnInit {

    // @Input() staffExperiences: Array<StaffExperience> = [];

    displayedColumns = ['Type', 'InstitueName', 'FromDate', 'ToDate', 'Details', 'Delete'];
    dataSource = new MatTableDataSource<StaffExperience>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input()
    set staffExperiences(staffExperiences: Array<StaffExperience>) {
        this.dataSource.data = staffExperiences;
    }
    @Input() staffId: number;

    constructor(public dialog: MatDialog, public injector: Injector) {
        super(injector);
    }

    openDialog(): void {
        const staffExperience = new StaffExperience();
        staffExperience.StaffInfoId = this.staffId;
        const dialogRef = this.dialog.open(AddCertificateExperienceComponent, {
            width: '500px',
            data: { staffExperience: staffExperience }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //   this.animal = result;
        });
    }

    ngOnInit() {
        this.services.spinnerService.show();
        this.subscribeStaffExperienceData();
    }

    private subscribeStaffExperienceData(): void {
        this.services.staffService.staffExperienceData.subscribe((result) => {
            if (!!result) {
                this.dataSource = new MatTableDataSource<StaffExperience>(result.reverse());
                this.dataSource.paginator = this.paginator;
            }

            this.services.spinnerService.hide();
        });


    }

    public removeExperience(experience: string): void {
        this.services.spinnerService.show();
        this.services.staffService.deleteStaffExperience(experience).subscribe((result) => {
            if (result) {
                this.services.spinnerService.hide();
                this.services.notificationService.show('deleted successfully');
                this.services.staffService.getStaffExperiences(this.staffId.toString());
            }
        });
    }

}
