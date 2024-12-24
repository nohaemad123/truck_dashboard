import { Title } from '@angular/platform-browser';
import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

export class banks {
  id: number;
  bankName: string;
  bankNameAr: string;
  // status:boolean=true;
}

export class IBanks {
    pageSize: number;
    currentPage: number;
    totalItems: number;
    totalPages: number;
    items: IBanksItemes[]
}


export class IBanksItemes {
    id: number;
    bankName: string;
}



export const Table_Coloumns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
  { title: "#", type: 'index', data: {prop: 'id'}, width: 30, },
  { title: "اسم البنك", type: 'text', data: {prop: 'bankName'}, width: 30, },
  // { title: "Banks.STATUS", type: 'status', data: { prop: 'id' }, width: 60 },
  // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
  { title: "الاجراءات", type: 'actions', data: [{id:"id", name:'edit', iconTitle: "تعديل البنك"},{id:"id", name:'delete', iconTitle: "جذف البنك"}], width: 280 },    
]

export const small_columns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
  //   { title: "م", type: 'index', width: 30 },
  { title: "م", type: 'index', width: 100 },

  { title: "اسم البنك", type: 'text', data: {prop: 'bankName'}, width: 170, },

  // { title: "رقم الهاتف", type: 'text', data: {prop: 'phoneNumber'}, width: 240, },
  // { title: "نوع المستخدم", type: 'text', data: {prop: 'userType'}, width: 200, },
  // { title: "اسم العربة المتنقلة", type: 'text', data: {prop: 'truckName'}, width: 200, },

  // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
  {
    title: "", type: 'actions', width: 100,
    data: [
      { id: "id", name: 'edit', iconTitle: 'تعديل البنك' },
      { id: "id", name: 'delete', iconTitle: 'حذف البنك' }]
  },
]