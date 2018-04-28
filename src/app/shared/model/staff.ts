import * as moment from 'moment';
import { MultimediaFile } from './mutimedia';
export class StaffBasicInfo {

    SchoolInfoId: number;
    StaffInfoId: number;
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    MobileNumber: string;
    Address: string;
    StaffTypeId: number;
    StaffSubTypeId: number;
    OtherInfo: string;
    MarriedStatus: boolean;
    Gender: string;
    Dob: moment.Moment;
    DateOfJoining: moment.Moment;
    DateOfLeaving: moment.Moment;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
    IsAppSignUp: boolean;
    IsActive = true;
    staffTypeList: Array<StaffTypeModel>;
    staffSubTypeList: Array<StaffSubTypeModel>;
}

export class StaffOtherInfo {
    StaffOtherInfoId: number;
    StaffInfoId: number;
    HighEducation: string;
    DegreeIds: string;
    DegreeSepecialization: string;
    SubjectIds: string;
    Skills: string;
    Awards: string;
    Hobbies: string;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
    DegreeIdList: Array<number>;
    SubjectIdList: Array<number>;
}


export class StaffExperience {
    StaffExperienceId: number;
    StaffInfoId: number;
    FromDate: moment.Moment;
    ToDate: moment.Moment;
    ExperienceTypeId: number;
    Name: string;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
}

export class StaffClass {
    StaffInfoId: number;
    ClassIds: Array<number>;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
}

export class StaffDocument {
    StaffDocumentId: number;
    StaffInfoId: number;
    DocumentName: string;
    DocumentCode: string;
    ManualVerification: true;
    DocURL: string;
    VerifiedBy: string;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
    MultimediaFile: MultimediaFile;
}


export class StaffTypeModel {
    constructor(
        public StaffTypeId: number,
        public StaffTypeName: string,
    ) { }
}


export class StaffSubTypeModel {
    constructor(
        public StaffSubTypeId: number,
        public StaffTypeId: number,
        public StaffSubTypeName: string,
    ) { }
}


export class StaffInfo {
    staffBasicInfo: StaffBasicInfo;
    staffOtherInfo: StaffOtherInfo;
    staffExperiences: Array<StaffExperience>;
    staffDocuments: Array<StaffDocument>;
    staffClass: StaffClass;
}

