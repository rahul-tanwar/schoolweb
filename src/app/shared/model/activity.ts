import * as moment from 'moment';

export class Activity {
    ActivityDetailsId: number;
    StaffId: number;
    ActivityDate: moment.Moment;
    IsStudentLevel: boolean;
    IsClassLevel: boolean;
    IsSchoolLevel: boolean;
    StudentId: number;
    ImageURL: string;
    Notes: string;
    ActivityTypeId: number;
    ActivityName: string;
    ActivitySubTypeNames: string;
    ActivitySubChildTypeNames: string;
    ActivitySubTypeIds: string;
    ActivitySubChildTypeIds: string;
    AcivitySubName: string;
    ClassId: number;
}
