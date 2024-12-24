import { IColoumnType } from "@core/@ui-components/table/interface/table.interface";

export class Products {
    id:number;
    codeProduct: string = '';
    productName: string = '';
    productNameEn: string = '';
    priceProduct: number = 0;
    costProduct: number = 0;
    qteProducts: number = 0;
    minimumQTE: number = 0;
    maximumQTE: number = 0;
    companyId: number = 3
    weight: number = 0;
    productPageUrl: string = '';
    productPageTitle: string = '';
    productPageDescription: string = '';
    productShortDescription: string = '';
    productShortDescriptionEn: string = '';
    description: string = '';
    descriptionEn: string = '';
    requiredShipping: boolean = false;
    publishOnStore: boolean = true;
    brandID: number = 1;
    // firstImage:string;
    // category_name:string
    productImages: any[];
    taxId: number = 1;
    subCategories: any[] = [];
    allowBackorders: boolean = true;
    width: number = 0;
    height: number = 0;
    length: number = 0;
    vatAmount: number = 0;
    status: number = 0;
    publishDate: Date = new Date()
    tags: any[] = []
    rate:number=5
    brands:any
    hasFreeShipping=true
    isInCart=true
    isInWishlist=true
}

export class productImages {
    imageProduct: string;
    productId: number
}

export const Table_Coloumns: IColoumnType[] = [
    { title: "", type: 'selection', data: { prop: 'id' }, width: 20, },
    { title: "#", type: 'index', width: 20, },
    { title: "TABLE.NAME", type: 'avatar', data: { prop: 'productName', src: "firstImage", description: "productShortDescription" }, width: 280, },
    { title: "TABLE.CODE", type: 'text', data: { prop: 'codeProduct' }, width: 150, },
    { title: "TABLE.CATEGORY", type: 'text', data: { prop: 'category_name' }, width: 150, },
    { title: "TABLE.QUANTITY", type: 'text', data: { prop: 'qteProducts' }, width: 80 },
    { title: "TABLE.PRICE", type: 'text', data: { prop: 'priceProduct' }, width: 80, },
    { title: "TABLE.WEIGHT", type: 'text', data: { prop: 'weight' }, width: 80 },
    { title: "TABLE.RATING", type: 'rate', data: { prop: 'companyId' }, width: 120 },
    { title: "TABLE.STATUS", type: 'status', data: { prop: 'status' }, width: 120 },
    { title: "TABLE.ACTIONS", type: 'actions', data: [{ id: "id", name: 'edit', url: '/admin/products/edit', collapsed: true }, { id: "id", name: 'delete', collapsed: true }, { id: "id", name: 'view', url: '/admin/products/show', collapsed: true }], width: "auto", },

]
