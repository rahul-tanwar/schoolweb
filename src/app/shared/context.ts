import { User } from '../shared/model/user';

export class Context {

    private static SchoolId: number;

    public static setContext(user: User) {
        Context.SchoolId = user.SchoolInfoId;
    }

    public static getSchoolId() {
        return Context.SchoolId;
    }

}
