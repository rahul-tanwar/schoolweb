import * as moment from 'moment';
import { Parent } from './parent';

export class Student {
    StudentId: number;
    SchoolInfoId: number;
    StudentUniqueId: string;
    Name: string;
    DOB: moment.Moment;
    IsActive: boolean;
    AadharNumber: string;
    ClassId: number;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
    AppCode: string;
    ClassName: string;
    isSelected = false;
}

export class StudentAppCode {
    StudentUniqueId: string;
    StudentId: number;
    AppCode: string;
}





