import * as moment from 'moment';
import { Parent } from './parent';

export class Student {
    StudentId: number;
    SchoolInfoId: number;
    StudentUniqueId: string;
    Name: string;
    Gender: string;
    DOB: moment.Moment;
    IsActive: boolean;
    AadharNumber: string;
    ClassId: number;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
    AppCode: string;
    ClassName: string;
    isSelected = false;
    ParentProfile: Array<Parent>;
}

export class StudentAppCode {
    StudentUniqueId: string;
    StudentId: number;
    AppCode: string;
}





