import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

  @Input() dropdownSettings={};
  @Input() dropdownList=[];
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Output() selectItem=new EventEmitter<any>();
  product_id:any;
  selectId:string=''
  @Input() selectedItems=[];

  constructor() { }

  ngOnInit(): void {
    console.log("dropdown list: ",this.dropdownList);
    console.log("selected items : ",this.selectedItems)
  }

  onItemSelect(e:any){

    this.selectItem.emit(e.item_id)
  }
}