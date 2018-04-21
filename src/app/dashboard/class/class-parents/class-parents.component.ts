import { Component, OnInit, Input } from '@angular/core';
import { ListType } from '../../../shared/model/parent';

@Component({
    selector: 'app-class-parents',
    templateUrl: './class-parents.component.html',
    styleUrls: ['./class-parents.component.css']
})
export class ClassParentsComponent implements OnInit {


    @Input() public classId: number;

    public filter: string;
    public listType = ListType;
    constructor() { }

    ngOnInit() {

    }

}
