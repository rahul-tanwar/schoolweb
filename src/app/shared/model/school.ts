import * as moment from 'moment';



export class SchoolInfo {
    schoolBasicInfo: SchoolBasicInfo;
    schoolOtherInfo: SchoolOtherInfo;
}


export class SchoolBasicInfo {

    SchoolInfoId: number;
    Name: string;
    Email: string;
    ContactNumber: string;
    Address: string;
    City: string;
    BoardTypeId: number;
    SchoolUniqueId: string;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
    SchoolTypeIdList: Array<number>;
    IsActive = true;
    UserId: number;
}

export class SchoolOtherInfo {
    SchoolOtherInfoId: number;
    SchoolInfoId: number;
    OtherContactName: string;
    OtherEmail: string;
    OtherContacNumber: string;
    Designation: string;
    Tagline: string;
    Validity: moment.Moment;
    logo: string;
    AllowVideo: boolean;
    AllowBranding: boolean;
    AllowDocument: boolean;
    UpdateDate: moment.Moment;
    UpdatedEmail: string;
    IsActive = true;
}