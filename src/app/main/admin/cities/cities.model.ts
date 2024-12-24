import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

export class cities{
    cityName:string='';
    cityNameAr:string=''
}

export const Table_Coloumns: IColoumnType[] = [
    // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
      { title: "م", type: 'index', width: 30 },
    { title: "اسم المدينة", type: 'text', data: {prop: 'cityName'}, width: 30, },
    // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
    { title: "الاجراءات", type: 'actions', data: [{id:"id", name:'edit', iconTitle: "تعديل المدينة"},{id:"id", name:'delete', iconTitle: "حذف المدينة"}], width: 280 },    
  ]

  export const small_columns: IColoumnType[] = [
    // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
    //   { title: "م", type: 'index', width: 30 },
    { title: "م", type: 'index', width: 100 },
  
    { title: "اسم المدينة", type: 'text', data: {prop: 'cityName'}, width: 180, },
  
    // { title: "رقم الهاتف", type: 'text', data: {prop: 'phoneNumber'}, width: 240, },
    // { title: "نوع المستخدم", type: 'text', data: {prop: 'userType'}, width: 200, },
    // { title: "اسم العربة المتنقلة", type: 'text', data: {prop: 'truckName'}, width: 200, },
  
    // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
    {
      title: "", type: 'actions', width: 100,
      data: [
        { id: "id", name: 'edit', iconTitle: 'تعديل المدينة' },
        { id: "id", name: 'delete', iconTitle: 'حذف المدينة' }]
    },
  ]