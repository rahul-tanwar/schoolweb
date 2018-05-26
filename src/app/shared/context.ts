import { User } from '../shared/model/user';

export class Context {

    private static SchoolId: number;
    private static UserName: string;
    private static RoleName: 'SuperAdmin' | 'Admin';
    private static UserId: number;

    public static setContext(user: User) {
        Context.SchoolId = user.SchoolInfoId;
        Context.UserName = user.UserName;
        Context.RoleName = user.RoleName as any;
        Context.UserId = +user.UserId;
    }

    public static getSchoolId() {
        return +Context.SchoolId;
    }

    public static getUserName() {
        return Context.UserName;
    }

    public static getUserRole() {
        return Context.RoleName;
    }

    public static getUserId() {
        return Context.UserId;
    }

}
