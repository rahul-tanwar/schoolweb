import * as moment from 'moment';

export class Class {
    ClassId: number;
    SchoolInfoId: number;
    ClassName: string;
    IsActive: boolean;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
    TotalStudent: string;
}

export class StudentClassModel {
    ClassId: number;
    StudentIds: Array<number>;
}

