import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";
 
 export class Truks {
  pageSize: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
  items: TrucksItmes[]
}





 export class TrucksItmes {
  
    id: number;
    truckName: string='';
    truckNameAr:string='';
    description: string='';
    descriptionAr:string='';
    truckImage: string;
    commercialRegistrationImage: string;
    bankAccountNumber: string;
    bankId: number;
    bankName: string;
    address: string;
    addressAr:string='';
    deliveryPriceInsideCity: number;
    deliveryPriceOutInsideCity: number;
    registrationDate: Date=new Date();
    isOnline: boolean=true;
    isApproved: boolean=true;
    lat: number;
    lon: number;
    businessTypeId: number;
    businessName: string;
    cityId: number;
    cityName: string;
    userId: number;
    userName: string;
    truckRatings: truckRatings []
  
}

interface truckRatings{
  id: number;
  ratingCount: number;
  truckDataId: number;
  truckName: string;
  userId: number;
  userName: string;
  profileImage: string
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
  { title: "الاجراءات", type: 'actions', data: [{id:"id", name:'edit',url: '/admin/Trucks/Edit'
  , iconTitle: "تعديل تراك"},
  {id:"id", name:'delete', iconTitle: "حذف تراك" },
  {id:"id", name:'view',url:"/admin/RequestsTrucks/View",Show:true, iconTitle: "تفاصيل التراك"}], width: 20 },    
]





export const small_columns: IColoumnType[] = [

  { title: "م", type: 'index', width: 30 },
  { title: "اسم العربة", type: 'avatar', data: {prop: 'truckName',src:'truckImage',description:'description'}, width: 180},
  // { title: "نوع النشاط", type: 'text', data: {prop: 'businessName'}, width: 100, },
  { title: "قبول التراك", type: 'checkBox', data: {prop: 'isApproved'}, width: 80},
  // { title: "التقيم", type: 'rate', data: {prop: 'trackRating'}, width: 100 },


  { title: "", type: 'actions', width:100,
  data: [{id:"id", name:'edit',iconTitle:'تعديل التراك',url: '/admin/Trucks/Edit'},
  {id:"id", name:'delete',iconTitle:'حذف التراك',},
  {id:"id", name:'view',url:"/admin/RequestsTrucks/View",Show:true,iconTitle:'عرض التراك',}]

},    
]

