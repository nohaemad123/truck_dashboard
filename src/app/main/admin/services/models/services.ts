import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

 export class Services {
  serviceTitle:string=''
  serviceTitleAr:string=''
  serviceDescription:string=''
  serviceDescriptionAr:string=''
  sort:number;
//   pageDescription:string=''
//   pageDescriptionAr:string=''
//   pageContent:string=''
//   pageContentAr:string=''
//   status:boolean=true
icon:string=''
}

export const Table_Coloumns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
{ title: "م", type: 'index', width: 100 },
{ title: "الخدمه", type: 'avatar', data: {prop: 'serviceTitle',src:"icon"}, width: 200 },
  // { title: "وصف الخدمه", type: 'text', data: {prop: 'serviceDescription'}, width: 280, },
  { title: "الترتيب", type: 'text', data: {prop: 'sort'}, width: 100, },
  { title: "الاجراءات", type: 'actions', data: [{id:"id", url:"admin/services/Edit",name:'edit',iconTitle:"تعديل الخدمه"},{id:"id", name:'delete',iconTitle:"حذف الخدمه"}], width: 280 },    
]



export const small_columns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
  //   { title: "م", type: 'index', width: 30 },
  { title: "م", type: 'index', width: 10 },
  { title: "الخدمه", type: 'avatar', data: {prop: 'serviceTitle',src:"icon"}, width: 240 },
    // { title: "وصف الخدمه", type: 'text', data: {prop: 'serviceDescription'}, width: 280, },
    { title: " ", type: 'actions', data: [{id:"id", url:"admin/services/Edit",name:'edit',iconTitle:"تعديل الخدمه"},{id:"id", name:'delete',iconTitle:"حذف الخدمه"}], width: 40 },    

 
];
