import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IInput } from './model/input.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input()  formGroup:any;
  @Input() options:IInput ={
    label:'',
    type:'',
    placeHolder:'',
    formControlName:'',
    name:'',
    id:'',
    class:'',
    style:{

    },
    labelOptions:[]


  }



  constructor() { }

  ngOnInit(): void {
  }

}
