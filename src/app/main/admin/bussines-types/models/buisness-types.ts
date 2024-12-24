import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

export class BusinessTypes {
  businessName: string = ''
  businessNameAr: string = ''
  deliveryCommission: number
}

export const Table_Coloumns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
  { title: "م", type: 'index', width: 30 },
  { title: "نوع النشاط", type: 'text', data: { prop: 'businessName' }, width: 30, },
  { title: "عمولة التوصيل", type: 'text', data: { prop: 'deliveryCommission', concatText: '%' }, width: 30, },
  // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
  { title: "الاجراءات", type: 'actions', data: [{ id: "id", name: 'edit' , iconTitle: "تعديل نوع النشاط"}, { id: "id", name: 'delete' , iconTitle: "حذف نوع النشاط"}], width: 280 },
]

export const small_columns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
  //   { title: "م", type: 'index', width: 30 },
  { title: "م", type: 'index', width: 50 },

  { title: "نوع النشاط", type: 'text', data: { prop: 'businessName' }, width: 120, },
  { title: "عمولة التوصيل", type: 'text', data: { prop: 'deliveryCommission', concatText: '%' }, width: 100, },
  // { title: "رقم الهاتف", type: 'text', data: {prop: 'phoneNumber'}, width: 240, },
  // { title: "نوع المستخدم", type: 'text', data: {prop: 'userType'}, width: 200, },
  // { title: "اسم العربة المتنقلة", type: 'text', data: {prop: 'truckName'}, width: 200, },

  // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
  {
    title: "", type: 'actions', width: 80,
    data: [
      { id: "id", name: 'edit', iconTitle: 'تعديل النشاط'},
      { id: "id", name: 'delete', iconTitle: 'حذف النشاط' }]
  },
]