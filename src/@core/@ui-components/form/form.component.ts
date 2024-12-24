import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IForm, IFormcontrols } from './model/form.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() submit =new EventEmitter()
formStyle:any={
}
  // fieldGroup:IFormcontrols=[
  //   {
  //     key:'user',
  //     templateOptions:{
  //       type:'Text',
  //       required:true,
  //       placeHolder:'enter user',
  //       label:'user',
  //       formControlName:'user'
  //     },
  //     validators:[
  //       {
  //         name:'required',
  //         message:'required'
  //       },
  //       {
  //         name:'maxLength',
  //         message:"max"
  //       }
  //     ]


  //     ,
  //     onChange() {
  //       console.log('kkkk',);

  //     },



  //   },
  //   {
  //     key:'password',
  //     templateOptions:{
  //       type:'password',
  //       required:true,
  //       placeHolder:'type password',
  //       label:'passord',
  //       formControlName:'password'
  //     },
  //     validators:[
  //       {
  //         name:'required',
  //         message:'this.field is required'
  //       }
  //     ],
  //     onChange(){
  // console.log();


  //     }

  //   }
  // ]

  fieldGroup:IFormcontrols=[]

@Input() options:IForm ={

  fieldGroup:[],
  button:{
    name:''
  }
}


  form :any;




  constructor(private fb:FormBuilder){


  }

  get getFormControl(){

    return this.form.controls;
  }

  setFormControls(fieldGroup:IFormcontrols){
    const group: any = {};
    fieldGroup.forEach((e:any) => {
      group[e.key] = e.templateOptions.required ? new FormControl(e.templateOptions.value || '', [Validators.required,Validators.maxLength(6)])
        : new FormControl(e.templateOptions.formControlName || '');
    });
    // console.log("🚀 ~ fieldGroup.forEach ~ e", group)

    return this.fb.group(group)
  }




  ngOnInit(): void {
  this.form = this.setFormControls(this.options.fieldGroup)
   this.formStyle = this.options.formStyle
  }


  onSubmit(){
    console.log(this.form.value);
    this.submit.emit(this.form)
  }
}
