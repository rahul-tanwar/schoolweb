import * as moment from 'moment';
import { Student } from './student';
import { MultimediaFile } from './mutimedia';

export class Parent {
    StudentParentId: number;
    UserId: number;
    StudentId: number;
    FirstName: string;
    LastName: string;
    Gender: string;
    Email: string;
    Password: string;
    MobileNumber: string;
    ContactNumber: string;
    IsActive: true;
    IsAppSignUp: false;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
    profileImage: MultimediaFile;
}

export enum ListType {
    All,
    Class,
    Student
}

