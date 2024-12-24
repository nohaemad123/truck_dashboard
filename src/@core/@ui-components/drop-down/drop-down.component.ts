import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input('items')items:any;  // ايه لازمته هنا وانت بتعرف ال options عشان مستخدمينه في form component
 @Input()options:any={
  items:[],
  placeholder:'',
  style:{}
 };
   selectId:string=''
@Output() selectCategory=new EventEmitter<any>()
  constructor() {}

  ngOnInit(): void {
  console.log(this.options.items);
  if(this.options.items[0].selectedId){
    this.selectId =this.options.items[0].selectedId
  }else{
    this.selectId =this.options.items[0].id

  }
  // console.log(this.selectId);


  }
  onSelected(e:any) {
     this.selectId =e.target.value
     this.selectCategory.emit(this.selectId)
  }
}
