import { IInput } from "../../input/model/input.interface"

export interface IForm {
    header?:any,
    formStyle?:any,
    fieldGroup:IFormcontrols,
    button:any,
    textinfo?:any,



}

export interface IFormcontrols  extends  Array<IControls>  {}

export interface IControls {
  key: string,
  templateOptions:  IInput,
  validators?:IValidations,
  onChange?:()=> any
}

export interface IValidations  extends  Array<IValidationsValue> {

}

export interface IValidationsValue {
  name:string,
  message:string
}

// export interface IStyle {

//   width?:string,
//   height?:string,
//   backgroundColor?:string,
//   color?:string,
//   padding?:string

// }

