
interface coloumnObject {
  title: string;
  width?: number | "auto",
  sortable?: boolean,
  resizeable?: boolean,
  draggable?: boolean
}
interface IIndex extends coloumnObject {
  type: 'index'
  data?: { prop?: string }
}
interface ISelection extends coloumnObject {
  type: 'selection'
  data: { prop: string }
}

interface IText extends coloumnObject {
  type: 'text'
  data: { prop: string,concatText?:string }
}

interface IImage extends coloumnObject {
  type: 'image'
  data: { prop: string }
}

interface IcheckBox extends coloumnObject {
  type: 'checkBox'
  data: { prop: string }
}


interface IDate extends coloumnObject {
  type: 'date'
  data: { prop: string }
}
interface IRate extends coloumnObject {
  type: 'rate'
  data: { prop: string }
}

interface IStatus extends coloumnObject {
  type: 'status'
  data: { prop: string }
}
interface IAvatar extends coloumnObject {
  type: 'avatar'
  data: { src: string, prop: string, description?: string }
}
export interface IActions extends coloumnObject {
  type: 'actions'
  data: { id: any, name: 'view' | 'edit' | 'delete' | 'archive' | 'download' | 'duplicate'|'send'|'mail'|'bell', url?: string, modal?: string,
   collapsed?: boolean,Show?:boolean,propCondation?:string,iconTitle?:string }[]
}
/** {title, type, data, width?, sortable?, resizeable?, draggable?} 
   * {
   * @title string
   * @type  'index' |'selection' | 'text' | 'image' | 'date' | rate | status | 'avatar' | 'actions'   * 
   * }
   */
export type IColoumnType = IIndex | ISelection | IText |IcheckBox| IImage | IDate | IRate | IStatus | IAvatar | IActions;
export const ActionsList = [
  { name: 'view', icon: 'eye' },
  { name: 'send', icon: 'send' },
  { name: 'mail', icon: 'mail' },
  { name: 'archive', icon: 'archive' },
  { name: 'delete', icon: 'trash-2' },
  { name: 'download', icon: 'download' },
  { name: 'edit', icon: 'edit' },
  { name: 'duplicate', icon: 'copy' },
  { name: 'bell', icon: 'bell' },
];
export const StatusList = [
  { id: 1, name: 'مفعل', class: 'badge-light-primary' },
  { id: 2, name: 'غير مفعل', class: 'badge-light-danger' },
  { id: 3, name: 'Scheduled', class: 'badge-light-success' },
  { id: 4, name: 'draft', class: 'badge-light-Dark' },
];
