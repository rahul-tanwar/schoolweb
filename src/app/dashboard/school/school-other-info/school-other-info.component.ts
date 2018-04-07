import { Component, OnInit, Input } from '@angular/core';
import { SchoolOtherInfo } from '../../../shared/model/school';
import { SchoolService } from '../../../shared/service/school/school.service';

@Component({
    selector: 'app-school-other-info',
    templateUrl: './school-other-info.component.html',
    styleUrls: ['./school-other-info.component.css']
})
export class SchoolOtherInfoComponent implements OnInit {

    @Input() public schoolOtherInfo: SchoolOtherInfo = new SchoolOtherInfo();

    constructor(private schoolService: SchoolService) { }

    ngOnInit() {
        console.log(this.schoolOtherInfo);

    }


    public save(): void {
        this.schoolService.saveOtherInfo(this.schoolOtherInfo).subscribe((result) => {
            alert('successfully saved');
        });
    }

}
