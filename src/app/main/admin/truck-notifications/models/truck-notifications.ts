import { IColoumnType } from "@core/@ui-components/table/interface/table.interface"

export class Notifications {
    userId: number;
    title: string='';
    body: string='';
    date:Date=new Date();
    truckName:string='';
    image: string=''
}


export const Table_Coloumns: IColoumnType[] = [
    // { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
    { title: "م", type: 'index', data: { prop: 'id' }, width: 30, },
    { title: "الاشعار", type: 'avatar', data: { prop: 'title', src: 'image', description: "body" }, width: 220 },
    { title: "المستخدم", type: 'text', data: { prop: 'userNameAr' }, width: 220, },
    // { title: "التراك", type: 'text', data: { prop: 'userNameAr' }, width: 220, },
    // { title: "Banks.STATUS", type: 'status', data: { prop: 'id' }, width: 60 },
    // { title: "Banks.TITLE", type: 'avatar', data: {prop: 'name',src:"imgBrand",description:'description'}, width: 280 },
    { title: "تاريخ الاشعار", type: 'date', data: { prop: 'date' }, width: 20, },

]

export const small_columns: IColoumnType[] = [

    { title: "م", type: 'index', data: { prop: 'id' }, width: 30, },
    { title: "الاشعار", type: 'avatar', data: { prop: 'title', src: 'image', description: "body" }, width: 180 },
    { title: "المستخدم", type: 'text', data: { prop: 'userNameAr' }, width: 250, },

]