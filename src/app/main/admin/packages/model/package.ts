import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

export class Packages{
    packageTitle:string=''
    packageTitleAr:string=''
    packageDescription:string=''
    packageDescriptionAr:string=''
    features:features[]=[]
    featuresAr:featuresAr[]=[]
    best_value:boolean=false
    status:boolean=true
}

export class features{
    id:number
    Description:string=''
}

export class featuresAr{
    id:number
    Description:string=''
}

export const Table_Coloumns: IColoumnType[] = [
    // // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
    //   { title: "م", type: 'index', width: 30 },
    // { title: "نوع النشاط", type: 'text', data: {prop: 'businessName'}, width: 30, },
    // { title: "عمولة التوصيل", type: 'text', data: {prop: 'deliveryCommission',concatText:'%'}, width: 30, },
    // // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
    // { title: "الاجراءات", type: 'actions', data: [{id:"id", name:'edit'},{id:"id", name:'delete'}], width: 280 },    
  ]