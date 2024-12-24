export interface IButton {
    name:string,
    type?:string,
    style?:IButtonStyle,
    icon?:string
}

export interface IButtonStyle {
   color?:string,
   backgroundColor?:string,
   width?:string,
   height?:string,
   display?:string
}
