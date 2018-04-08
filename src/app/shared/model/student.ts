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

export class StudentPatent {
    student: Student;
    parents: Parent[];
}

export class StudentAppCode {
    StudentId: number;
    AppCode: string;
}





