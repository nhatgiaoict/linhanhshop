export class LoggedInUser {
    constructor(access_token: string, username: string, fullname: string, email: string, avatar: string, roles:any, permissions:any) {
        this.access_token = access_token;
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.avatar = avatar;
        this.roles=roles;
        this.permissions=permissions;

    }

    public id: string;
    public access_token: string;
    public username: string;
    public fullname: string;
    public email: string;
    public avatar: string;
    public roles:any;
    public permissions:any;
}