import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

 export class SetAPart {
  title:string=''
titleAr:string=''
//   pageDescription:string=''
//   pageDescriptionAr:string=''
//   pageContent:string=''
//   pageContentAr:string=''
//   status:boolean=true
  icon:string=''
}

export const Table_Coloumns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
    { title: "م", type: 'index', width: 30 },
  // { title: "صوره الميزة", type: 'image', data: {prop: 'icon'}, width: 30, },
  // { title: "عنوان الميزة", type: 'text', data: {prop: 'title'}, width: 30, },
  { title: "الميزة", type: 'avatar', data: {prop: 'title',src:"icon"}, width: 280 },
  { title: "الاجراءات", type: 'actions', data: [{id:"id", name:'edit',url:"admin/features/Edit"},{id:"id", name:'delete'}], width: 280 },    
]

export const small_columns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
  //   { title: "م", type: 'index', width: 30 },
  { title: "م", type: 'index', width: 10 },
  { title: "الميزة", type: 'avatar', data: {prop: 'title',src:"icon"}, width: 280 },

    { title: " ", type: 'actions', data: [{id:"id", url:"admin/services/Edit",name:'edit',iconTitle:"تعديل الخدمه"},{id:"id", name:'delete',iconTitle:"حذف الخدمه"}], width: 40 },    

 
];