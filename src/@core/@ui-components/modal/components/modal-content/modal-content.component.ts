import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IModal } from '../../model/modal.interface';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalContentComponent implements OnInit {
  @Input() options: IModal;
  // @Input()modalname:any|undefined;
subscriptionModal:Subscription|undefined
  hideDilogeFlage=false;
  constructor(private router: Router,public modalServ:NgbModal) {

    this.options = {
      imgSrc: 'successfully.svg',
      header: 'Password Reset',
      modalname:'test',
      message: 'Your password has been Reset Successfully',
      buttons: {
        name: 'Back to Home',
      },
    };
  }



  ngOnInit(): void {
  }

  onDestroy(){
    this.subscriptionModal?.unsubscribe()

  }


  goTo(reedirectTo: any) {
    this.router.navigateByUrl(reedirectTo);
  }

  closeModale(){
    this.modalServ.dismissAll(this.options.modalname);
  }


  dissmissMoadal(){
    this.modalServ.dismissAll(this.options.modalname);
  }
}
