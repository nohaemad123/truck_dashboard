import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";
 
 export class Subscriptions {
subscriptName:string=''
subscriptNameAr:string=''
subscriptionType:number
country:number
status:boolean=true
}





 
export const Table_Coloumns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 5number, },
  { title: "#", type: 'index', width: 30 },
  { title: "اسم العربة", type: 'avatar', data: {prop: 'truckName',src:'truckImage',description:'description'}, width: 100},
  // { title: "السجل التجاري", type: 'image', data: {prop: 'commercialRegistrationImage'}, width: 20},
  { title: "قبول التراك", type: 'checkBox', data: {prop: 'isApproved'}, width: 20},
  
  
  
 
  { title: "التوصيل داخل المدينة", type: 'text', data: {prop: 'deliveryPriceInsideCity',concatText:'ريال'}, width: 30, },
  { title: "التوصيل خارج المدينة", type: 'text', data: {prop: 'deliveryPriceOutInsideCity',concatText:'ريال'}, width: 20, },
  { title: "المدينة", type: 'text', data: {prop: 'cityName'}, width: 20, },

  { title: "نوع النشاط", type: 'text', data: {prop: 'businessName'}, width: 15, },

  { title: "تاريخ التسجيل", type: 'date', data: {prop: 'registrationDate'}, width: 20, },
  // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 28number },
  { title: "الاجراءات", type: 'actions', data: [{id:"id", name:'edit',url: '/admin/Trucks/Edit', iconTitle: "تعديل الاشتراك"},
  {id:"id", name:'delete', iconTitle: "حذف الاشتراك"},
  {id:"id", name:'view',url:"/admin/RequestsTrucks/View",Show:true}], width: 20 },    
]