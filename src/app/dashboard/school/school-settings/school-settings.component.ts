import { Component, OnInit, Input } from '@angular/core';
import { SchoolOtherInfo } from '../../../shared/model/school';
import { SchoolService } from '../../../shared/service/school/school.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-school-settings',
    templateUrl: './school-settings.component.html',
    styleUrls: ['./school-settings.component.css']
})
export class SchoolSettingsComponent implements OnInit {

    @Input() public schoolOtherInfo: SchoolOtherInfo;


    constructor(private schoolService: SchoolService, private router: Router) { }

    ngOnInit() {
    }


    public save(): void {
        this.schoolService.saveOtherInfo(this.schoolOtherInfo).subscribe((result) => {
            alert('successfully saved');
        });
    }

    public cancel(): void {
        this.router.navigateByUrl('/dashboard/school');
    }
}
