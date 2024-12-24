import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IButton, IButtonStyle } from './model/button.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() disabledBtn:boolean=true;
  @Input() options :IButton ={
    name:'button',
    style :{
      width:'600px'
    }

  }
  @Output() buttonClicked:EventEmitter<any> =new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

  buttonClick(e:Event){
this.buttonClicked.emit(e)
  }
}
