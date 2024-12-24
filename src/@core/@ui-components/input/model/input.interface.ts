import { FormControl, FormGroup } from "@angular/forms";

export interface IInput {
    label?:string,
    type:string,
    placeHolder?:any,
    formControlName?:any,
    name?:string,
    id?:string,
    class?:string,
    required?:boolean
    value?:string,
    style?:IInputStyle,
    textinfo?:any,
    items?:any,
    SectionLabel?:any
    labelOptions?:any[]
}

export interface IInputStyle {


}
