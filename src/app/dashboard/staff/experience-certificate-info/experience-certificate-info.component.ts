import { Component, OnInit, Input } from '@angular/core';
import { StaffExperience } from '../../../shared/model/staff';

@Component({
    selector: 'app-experience-certificate-info',
    templateUrl: './experience-certificate-info.component.html',
    styleUrls: ['./experience-certificate-info.component.css']
})
export class ExperienceCertificateInfoComponent implements OnInit {

    @Input() staffExperiences: Array<StaffExperience> = [];

    constructor() { }

    ngOnInit() {
    }

}
