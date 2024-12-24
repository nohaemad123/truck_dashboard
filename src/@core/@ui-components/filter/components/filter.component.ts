import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslationService } from 'src/app/@core/services/translation/translation.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() closePanalEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() formSubmit: EventEmitter<FormGroup> = new EventEmitter();
  @Output() formReset: EventEmitter<FormGroup> = new EventEmitter();


  // filterForm!: FormGroup;
  // statusList:any[] = [];
  // usersList:any[] = [];
  // sectors:any[] = [];


  constructor(private FB: FormBuilder,
    private translate :TranslationService
    // private sharedService:SharedService
    ) {
     
      
    }

  ngOnInit(): void {
    // this.BuildfilterForm();
    // this.getStatus();
    // this.getRequesters();
    // this.getDepartment();

    // this.formSubmit.emit(this.filterForm);

  }

  // BuildfilterForm() {
  //   this.filterForm = this.FB.group({
  //     requestID: [''],
  //     statusCode: [null],
  //     title: [''],
  //     createBy: [null],
  //     sectorCode: [null],
  //     dateFrom: [null],
  //     dateTo: [null],
  //   });
  // }

  // initForm() {
  //   return {
  //     requestID: '',
  //     statusCode: null,
  //     title: '',
  //     createBy: null,
  //     sectorCode: null,
  //     dateFrom: null,
  //     to: null,
  //   };
  // }

  // resetForm() {
  //   this.filterForm.reset(this.initForm());
  //   this.filterForm.updateValueAndValidity();
  //   this.formSubmit.emit(this.filterForm);

  // }

  // getStatus() {
  //   this.sharedService.statusList$.subscribe((status:any) => {
  //     status.map((el: any) => {
  //       this.statusList.push({
  //         text: el.statusName,
  //         id: el.statusCode
  //       })
  //     });
  //   })
  // }


  // getRequesters() {
  //   this.sharedService.requestersList$.subscribe((status:any) => {
  //     status.map((el: any) => {
  //       this.usersList.push({
  //         text: el.email,
  //         id: el.email
  //       })
  //     });
  //   })
  // }
   // get Department list
  //  getDepartment() {
  //   this.sharedService.departmentList$.subscribe((department:any) => {
  //     this.sectors = department;
  //     this.sectors.map((el: any) => {
  //       el.text =  el.sectorName,
  //       el.id = el.sectorCode;
  //       })
  //   })
  // }


  closePanal() {
     this.closePanalEvent.emit(false);
  }
  onSubmit(){
    this.formSubmit.emit();
    console.log('submit');
    
  }
  onReset(){
    this.formReset.emit();

    console.log('reset');
    
  }
}
