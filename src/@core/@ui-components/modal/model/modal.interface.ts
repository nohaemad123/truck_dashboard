export interface IModal {
  modalname:string;
  imgSrc?:string,
  header?:string,
  headerTitle?:string,
  headerTitleStyle?:any,
  headerStyle?:any;
  message?:string,
  buttons?:IModalButtons,
  style?:any
}

export interface IModalButtons {
  name:string,
  actions?:string,
  showBtn?:boolean
  showcancelBtn?:boolean
}
