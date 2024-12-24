import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

export class Orders{

}

export const Table_Coloumns: IColoumnType[] = [
    { title: "", type: 'selection', data: {prop: 'id'}, width: 50, },
      { title: "م", type: 'index', width: 30 },
    { title: "TABLE.ORDER_ID", type: 'index', data: {prop: 'code'}, width: 100, },
    { title: "TABLE.CUSTOMER", type: 'avatar', data: {prop: 'productName',src:"firstImage",description:"productShortDescription"}, width: 280, },
    { title: "TABLE.STATUS", type: 'index', data: {prop: 'usageLimit'}, width: 100, },
    { title: "TABLE.TOTAL", type: 'index', data: {prop: 'usageLimitPerCustomer'}, width: 100, },
    { title: "TABLE.DATE", type: 'date', data: {prop: 'startDate'}, width: 280, },
    { title: "TABLE.ACTIONS", type: 'actions', data: [{id:"id", name:'edit',url:'/admin/orders/edit'},{id:"id", name:'delete'}], width: 280},

]