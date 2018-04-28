import * as moment from 'moment';
import { Student } from './student';
import { MultimediaFile } from './mutimedia';

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
    profileImage: MultimediaFile;
}

export enum ListType {
    All,
    Class,
    Student
}

