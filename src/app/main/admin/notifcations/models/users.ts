import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

export class CUsers {
  username: string = "";
  userNameAr: string = "";
  email: string = "";
  phoneNumber: string = "";
  password: string = "";
  cityId: number;
  userType: number;
  profileImage: string = "";
  codeCountry: string;
}

export class UserDetails {
  username: string = "";
  userNameAr: string = "";
  email: string = "";
  cityName: string = "";
  phoneNumber: string = "";
  cityId: number;
  truckId: number;
  creationDate: string;
  userType: number;
  profileImage: string = "";
  codeCountry: string;
}

export class UserModel {
  username: string = "";
  userNameAr: string = "";
  email: string = "";
  cityName: string = "";
  phoneNumber: string = "";
  cityId: number;
  truckId: number;
  creationDate: string;
  userTypeId: number;
  password: string = "";
  profileImage: string = "";
  codeCountry: string;
}

export class userPassword {
  oldPassword: string = "";
  password: string = "";
  confirmPassword: string = "";
}
export const Table_Coloumns: IColoumnType[] = [
  { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
  { title: "م", type: "index", width: 30 },
  // checkbox
  {
    title: "اسم المستخدم",
    type: "avatar",
    data: { prop: "userNameAr", src: "profileImage", description: "truckName" },
    width: 200,
  },
  {
    title: "البريد الالكتروني",
    type: "text",
    data: { prop: "email" },
    width: 200,
  },
  {
    title: "رقم الهاتف",
    type: "text",
    data: { prop: "phoneNumber" },
    width: 240,
  },
  {
    title: "نوع المستخدم",
    type: "text",
    data: { prop: "userType" },
    width: 200,
  },
  // { title: "اسم العربة المتنقلة", type: 'text', data: {prop: 'truckName'}, width: 200, },

  // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
  {
    title: "الاجراءات",
    type: "actions",
    data: [
     
      { id: "id", iconTitle: "ارسال اشعار", name: "send", modal: "SendNotficationsModal" },
    ],
    width: 280,
  },
];

export const small_columns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
  //   { title: "م", type: 'index', width: 30 },
  { title: "م", type: "index", width: 30 },

  {
    title: "اسم المستخدم",
    type: "avatar",
    data: { prop: "userNameAr", src: "profileImage", description: "truckName" },
    width: 140,
  },
  {
    title: "البريد الالكتروني",
    type: "text",
    data: { prop: "email" },
    width: 120,
  },
  // { title: "رقم الهاتف", type: 'text', data: {prop: 'phoneNumber'}, width: 240, },
  // { title: "نوع المستخدم", type: 'text', data: {prop: 'userType'}, width: 200, },
  // { title: "اسم العربة المتنقلة", type: 'text', data: {prop: 'truckName'}, width: 200, },

  // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
  {
    title: "",
    type: "actions",
    width: 100,
    data: [
     
      {
        id: "id",
        name: "send",
        iconTitle: "ارسال اشعار",
        modal: "SendNotfications"
      },
    ],
  },
];
