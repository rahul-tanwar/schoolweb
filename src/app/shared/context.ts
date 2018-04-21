import { User } from '../shared/model/user';

export class Context {

    private static SchoolId: number;
    private static UserName: string;

    public static setContext(user: User) {
        Context.SchoolId = 1;
        Context.UserName = user.UserName;
    }

    public static getSchoolId() {
        return Context.SchoolId;
    }

    public static getUserName() {
        return Context.UserName;
    }

}
