import { EventEmitter, Injectable, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ModalComponent } from '../modal.component';
import { IModal } from '../model/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialogRef:any;
  @Output() clcikeventModal: EventEmitter<any> = new EventEmitter();
  @Output() closeModelEvent: EventEmitter<boolean> = new EventEmitter();


  constructor(private modalServ: NgbModal) { }



  
  openModal(modalName: any,modalSize='lg') {
    this.modalServ.open(modalName, {
      scrollable: true,
      centered: true,
      size:modalSize
    });
  }

  dissmissMoadal(modalname:any){
    this.modalServ.dismissAll(modalname);
  }





}
