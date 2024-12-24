import { Title } from '@angular/platform-browser';
import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

export class Banners {
  bannerImage:string
  bannerTitle: string;
  bannerTitleAr: string;
  // status:boolean=true;
  // bannerLink:string
  bannerDescription:string;
  bannerDescriptionAr:string;
// sequence:number
}





export const Table_Coloumns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
  { title: "م", type: 'index', data: {prop: 'id'}, width: 30, },
  { title: "البنر", type: 'avatar', data: {prop: 'bannerTitle',src:'bannerImage'}, width: 180},
  { title: "وصف البنر", type: 'text', data: {prop: 'bannerDescription'}, width: 250, },
  // { title: "Banks.STATUS", type: 'status', data: { prop: 'id' }, width: 60 },
  // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
  { title: "الاجراءات", type: 'actions', data: [{id:"id", name:'edit', iconTitle: "تعديل البنر",
url:'/admin/banners/Edit'},{id:"id", name:'delete', iconTitle: "حذف البنر"}], width: 50 },    
]

export const small_columns: IColoumnType[] = [

  { title: "م", type: 'index', width: 30 },
  { title: "البنر", type: 'avatar', data: {prop: 'bannerTitle',src:'bannerImage',description:"bannerDescription"}, width: 250},
  // { title: "نوع النشاط", type: 'text', data: {prop: 'businessName'}, width: 100, },
  // { title: "قبول التراك", type: 'checkBox', data: {prop: 'isApproved'}, width: 80},


  { title: "", type: 'actions', width:80,
  data: [{id:"id", name:'edit',iconTitle:'تعديل البنر',url: '/admin/banners/Edit'},
  {id:"id", name:'delete',iconTitle:'حذف البنر',}]},    
]