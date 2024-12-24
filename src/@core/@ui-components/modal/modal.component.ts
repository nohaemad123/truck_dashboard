import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IModal, IModalButtons } from './model/modal.interface';
import { ModalService } from './service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() options: IModal;
  @Input()modalname:any|undefined;

  hideDilogeFlage=false;
  constructor(public modalService: ModalService, private router: Router,public modalServ:NgbModal) {
    this.options = {
      imgSrc: 'successfully.svg',
      header: 'Password Reset',
      modalname:'tesst',
      message: 'Your password has been Reset Successfully',
      buttons: {
        name: 'Back to Home',
      },
    };
  }

  ngOnInit(): void {}

  onNoClick(): void {
    // this.dialogRef.close();
  }



  goTo(reedirectTo: any) {
    this.router.navigateByUrl(reedirectTo);
  }

  closeModale(){
    this.modalServ.dismissAll(this.modalname);
  }
}
