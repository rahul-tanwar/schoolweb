import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ClassService } from '../../../shared/service/class/class.service';

@Component({
    selector: 'app-class-details',
    templateUrl: './class-details.component.html',
    styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

    public classId: number;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.classId = params['id'];
        });

    }




}
