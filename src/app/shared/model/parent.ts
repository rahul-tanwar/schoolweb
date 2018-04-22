import * as moment from 'moment';
import { Student } from './student';

export class Parent {
    StudentParentId: number;
    UserId: number;
    StudentId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    MobileNumber: string;
    ContactNumber: string;
    IsActive: true;
    IsAppSignUp: true;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
}

export enum ListType {
    All,
    Class,
    Student
}

