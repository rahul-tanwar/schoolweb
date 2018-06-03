
export class User {
    UserName: string;
    password: string;
    grant_Type: 'password';
    access_token: string;
    token_type: string;
    UserId: string;
    RoleName: string;
    SchoolInfoId: number;
}

export class UserProfile {
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    ContactNumber: string;
}

export class UserChangePassword {
    UserId: number;
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
}
