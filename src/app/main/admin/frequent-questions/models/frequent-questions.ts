import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

 export class FrequentQuestion {
  question:string=''
  questionAr:string=''
  answer:string=''
  answerAr:string=''
  sort:number
}

export const Table_Coloumns: IColoumnType[] = [
  // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
    { title: "م", type: 'index', width: 30 },
  { title: "السؤال", type: 'text', data: {prop: 'question'}, width: 150, },
  { title: "الاجابة", type: 'text', data: {prop: 'answer'}, width: 400, },
  { title: "الترتيب", type: 'text', data: {prop: 'sort'}, width: 20 },
  // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
  { title: "الاجراءات", type: 'actions', data: [{id:"id", name:'edit', iconTitle: "تعديل السؤال",
  url: '/admin/Frequent-questions/Edit'},{id:"id", name:'delete', iconTitle: "حذف السؤال"}], width: 50 },    
]


export const small_columns: IColoumnType[] = [

  { title: "م", type: 'index', width: 30 },
  { title: "السؤال", type: 'text', data: {prop: 'question'}, width: 180, },
  // { title: "نوع النشاط", type: 'text', data: {prop: 'businessName'}, width: 100, },
  // { title: "قبول التراك", type: 'checkBox', data: {prop: 'isApproved'}, width: 80},
  { title: "الترتيب", type: 'text', data: {prop: 'sort'}, width: 80 },


  { title: "", type: 'actions', width:20,
  data: [{id:"id", name:'edit',iconTitle:'تعديل السؤال',url: '/admin/Frequent-questions/Edit'},
  {id:"id", name:'delete',iconTitle:'حذف السؤال',}]

},    
]