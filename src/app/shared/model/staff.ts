import * as moment from 'moment';
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

}