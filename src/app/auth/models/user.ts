import { Role, roles } from "./role";

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: Role;
  roles?:roles;
  token?: string;
  userId?:number;
  userNameAr?:string;
  userType?:number;
  username?:string;
  cityId?: number;
  codeCountry?: string;
  message?: string;
  phoneNumber?: string;
  profileImage?: string;
  roleName?: string;
  tokenexpiration?: Date;
  refreshToken?: string;
  setUser?(_User: any) {
    // let Tempuser = _User as BackEndUser;
    this.id = _User.userId;
    this.email = _User.email;
    (this.password = null),
      (this.firstName = _User.firstName ?? "John"),
      (this.lastName = _User.lastName ?? "Doe"),
      (this.avatar = _User.avatar ?? "avatar-s-11.jpg"),
      // (this.avatar = _User.profileImage ?? "avatar-s-11.jpg"),
      (this.userNameAr = _User.userNameAr ?? "ادمن"),
      (this.username = _User.username ?? "Admin"),

      (this.role =_User.userTypeId =='3'? Role.Admin:null); //_User.userRole == 'CompanyAdmin' ? Role.Admin : null;
    this.token = _User.token;
    this.refreshToken = _User.refreshToken;
    this.tokenexpiration = _User.tokenexpiration;
  }
}
export class BackEndUser {
  token: string;
  tokenexpiration: Date;
  refreshToken: string;
  refreshTokenExpiryDate: Date;
  userId: number;
  userRole: string;
  email: string;
  firstName: string;
  lastName: string;
  userPhotoSrc: string;

  address: string;
  city: string;
  area: string;
  roleid: number;
  firstLogin: boolean;
}
