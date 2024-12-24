import { IColoumnType } from "@core/@ui-components/table/interface/table.interface"

export class IContact{
    name?: string
    email?: string
    phone?: string
    tite?: string
    message?: string
}

export const Table_Coloumns: IColoumnType[] = [
    // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
    { title: "م", type: 'index', width: 30 },
    { title: "الاسم", type: 'text', data: { prop: 'name' }, width: 150, },
    { title: "العنوان", type: 'text', data: { prop: 'tite'}, width: 150, },
    { title: "الرساله", type: 'text', data: { prop: 'message'}, width: 200, },
    { title: "البريد الالكتروني", type: 'text', data: { prop: 'email'}, width: 200, },
    // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
    { title: "الاجراءات", type: 'actions', data: [{ id: "id", name: 'edit' , iconTitle: "تعديل الدعم الفني"}, { id: "id", name: 'delete' , iconTitle: "حذف الدعم الفني"}], width: 280 },
  ]

  export const small_columns: IColoumnType[] = [
    // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
    //   { title: "م", type: 'index', width: 30 },
    { title: "م", type: 'index', width: 50 },
  
    { title: "الاسم", type: 'text', data: { prop: 'name' }, width: 120, },
    { title: "الرسالة", type: 'text', data: { prop: 'message' }, width: 100, },
    // { title: "رقم الهاتف", type: 'text', data: {prop: 'phoneNumber'}, width: 240, },
    // { title: "نوع المستخدم", type: 'text', data: {prop: 'userType'}, width: 200, },
    // { title: "اسم العربة المتنقلة", type: 'text', data: {prop: 'truckName'}, width: 200, },
  
    // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
    {
      title: "", type: 'actions', width: 80,
      data: [
        { id: "id", name: 'edit', iconTitle: 'تعديل الدعم '},
        { id: "id", name: 'delete', iconTitle: 'حذف الدعم' }]
    },
  ]