import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { ListType } from '../../../shared/model/parent';

@Component({
    selector: 'app-class-details',
    templateUrl: './class-details.component.html',
    styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent extends BaseComponent implements OnInit {

    public classId: number;
    public listType = ListType;
    constructor(private route: ActivatedRoute,
        public injector: Injector
    ) { super(injector); }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.classId = +params['id'];
        });
        this.route.queryParams.subscribe((params) => {
            this.services.stateMachineService.setBreadCrumb.next('Class / ' + params['name']);
        });
    }
}
