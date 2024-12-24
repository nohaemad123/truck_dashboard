import { ToastrService } from "ngx-toastr";
import { ModalService } from '@core/@ui-components/modal/service/modal.service';
import { HttpService } from '@core/services/http.service';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { CoreTranslationService } from '@core/services/translation.service';
import { locale as arabic } from 'app/main/admin/banks/i18n/ar';
import { locale as english } from 'app/main/admin/banks/i18n/en';
import { banks, small_columns, Table_Coloumns } from '../models/banks';
import { IModal } from '@core/@ui-components/modal/model/modal.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from "@core/services/validations.service";
import { ArabicValidation } from "@core/directives/arabic-validation/arabic-validation";

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BanksComponent implements OnInit {
  public selectedOption = 10;
  sendNotifactionsOptoinsModal: IModal;
  contentHeader:any;
  public ColumnMode = ColumnMode;
  public temp = [];
  validationAllControlls: string;
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  // public SelectionType = SelectionType;
  public selected = [];
  ItemsPerpage=30;
  public Table_Coloumns=Table_Coloumns
  Allbanks: any;
  public AddNewBtn={url:'/admin/banks/Add'}
  public selectRole: any = [
    { name: 'All', value: '' },
    { name: 'Admin', value: 'Admin' },
    { name: 'Author', value: 'Author' },
    { name: 'Editor', value: 'Editor' },
    { name: 'Maintainer', value: 'Maintainer' },
    { name: 'Subscriber', value: 'Subscriber' }
  ];

  public selectPlan: any = [
    { name: 'All', value: '' },
    { name: 'Basic', value: 'Basic' },
    { name: 'Company', value: 'Company' },
    { name: 'Enterprise', value: 'Enterprise' },
    { name: 'Team', value: 'Team' }
  ];

  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'Pending' },
    { name: 'Active', value: 'Active' },
    { name: 'Inactive', value: 'Inactive' }
  ];

  public selectedRole = [];
  public selectedPlan = [];
  public selectedStatus = [];
  public searchValue = '';
  public selections:any[]=[];
  submitted=false;
   loading=false;
   bankData:any;
   bankId:any;

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  public small_columns=small_columns

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  addNewBankOptoinsModal:IModal;
  @ViewChild('addNewBank') addNewBank: ElementRef | undefined;
 bankobj= new banks();
 addBankForm:FormGroup;
  constructor(
    private _coreTranslationService: CoreTranslationService,
    private _httpService:HttpService,
    private _ValidationsService: ValidationsService,
    private _customModalService:ModalService,
    private fb:FormBuilder,
   private  toastr:ToastrService
    
  ) {
    this._unsubscribeAll = new Subject();
    this._coreTranslationService.translate(english, arabic);

  }


  validationControlls() {
    this.validationAllControlls =
      this._ValidationsService.checkIfControlsInValid(
        this.addBankForm,
        "addBankForm.formValidation"
      );
  }
  
  ChangeStatus(){
  //  this.addBankForm.controls['status'].setValue(this.addBankForm.controls['status'].value);
  }


  resetMyBankForm(){
    this.submitted=false;
    this.addBankForm.reset();
    this.getAllBanks()
  }

  deleteBank(id: any) {
    console.log(    this.selections
      )
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف البنك?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:"الغاء" ,
      confirmButtonText: "نعم احذف!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.delete('/Banks',{Id:id}).subscribe((data: any) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: "تم حذف البنك !" ,
              text: "تم حذف البنك بنجاح",
              confirmButtonText: "نعم",
              showConfirmButton: true,
              timer: 1500
            }).then((result)=>{
             
              this.getAllBanks();

            });
          } else {
            Swal.fire({
              icon: 'error',
              title: "error",
              text: data.responseMessage,
              showConfirmButton: true,
              timer: 1500
            })
          }
        })
      }
   
    })
  }
  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedRole = this.selectRole[0];
    this.selectedPlan = this.selectPlan[0];
    this.selectedStatus = this.selectStatus[0];

    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.Allbanks = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
 * For ref only, log selected values
 *
 * @param selected
 */
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }


  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByRole(event) {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousPlanFilter, this.previousStatusFilter);
    this.Allbanks = this.temp;
  }

  /**
   * Filter By Plan
   *
   * @param event
   */
  filterByPlan(event) {
    const filter = event ? event.value : '';
    this.previousPlanFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, filter, this.previousStatusFilter);
    this.Allbanks = this.temp;
  }

  /**
   * Filter By Status
   *
   * @param event
   */
  filterByStatus(event) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, this.previousPlanFilter, filter);
    this.Allbanks = this.temp;
  }

  /**
   * Filter Rows
   *
   * @param roleFilter
   * @param planFilter
   * @param statusFilter
   */
  filterRows(roleFilter, planFilter, statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    roleFilter = roleFilter.toLowerCase();
    planFilter = planFilter.toLowerCase();
    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialNameMatch = row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
      const isPartialGenderMatch = row.currentPlan.toLowerCase().indexOf(planFilter) !== -1 || !planFilter;
      const isPartialStatusMatch = row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch && isPartialGenderMatch && isPartialStatusMatch;
    });
  }


     

  get BankFormControls() {
    return this.addBankForm.controls;
  }

  CreateBankForm(){
    this.addBankForm=this.fb.group({
      bankName:[this.bankobj.bankName,[Validators.required]],
      bankNameAr:[this.bankobj.bankNameAr,[Validators.required]],
      // status:[this.bankobj.status],
      
    });
    
  }

  EditBank(e:any){
    if (e.id > 0) {
      this.bankId = e.id;
      console.log("id: ",this.bankId)
      this.addNewBankOptoinsModal = {
        headerTitle: 'تعديل البنك',
        modalname: 'addNewCity',
      };

      this._httpService.get('/Banks/GetBankById',{CountItems:10,page:1,id:this.bankId},false).subscribe((res: any) => {
        this.bankData = res.items[0]
  
        console.log('bank data: ',this.bankData)
        this.addBankForm.patchValue(this.bankData as banks);

      });

      // this.type = "edit";
      this._customModalService.openModal(this.addNewBank, 'md');
    }
  }
  
  saveBank(){
    this.submitted = true;
this.validationControlls()
    if (this.addBankForm.invalid) {
      return;
    }

    
    this.loading = true;
    Object.assign(this.bankobj, this.addBankForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);
    
    this._httpService.post('/Banks/AddBank',this.bankobj,false).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success(
          "تمت اضافة البنك بنجاح",
          "تمت الاضافة!",
          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
        this.resetMyBankForm();
        // this.closeModal();
        // this.getAllBanks();
        this.loading = false;
      }
    },((err=>{
      this.loading = false;
    })),()=>{
      this.loading = false;

    })




  }

  filterByPage() {
    this.getAllBanks();
  }

  ngOnInit(): void {
    this.CreateBankForm();
    this.addNewBankOptoinsModal = {
      headerTitle: 'اضافة بنك جديد',
      modalname: 'addNewBank',
    };
    this.getAllBanks();
    // this.Table_Coloumns;


 

   this.contentHeader = {
    headerTitle: 'Banks.TITLE',
    actionButton: true,
    breadcrumb: {
      type: '',
      links: [
        {
          name: 'Home',
          isLink: true,
          link: '/'
        },
        {
          name: 'Banks.TITLE',
          isLink: false
        }
      ]
    }
  };
  }

 

  getAllBanks() {
    this.Allbanks=[];
    this._httpService.get('/Banks/GetAllBanks',{CountItems:this.ItemsPerpage,page:1},false).subscribe((res: any) => {
      this.Allbanks = res.items

      console.log('Bankss',this.Allbanks)
    });
  }



  
  OpenModal(){
    this.resetMyBankForm();
    this._customModalService.openModal(this.addNewBank, 'md');

  }


  closeModal(){
    this._customModalService.dissmissMoadal(this.addNewBank);
    this.resetMyBankForm()
    this.getAllBanks()

  }


updateBank(){
  this.submitted = true;

    console.log("form value2: ",this.addBankForm.value)

    if (this.addBankForm.invalid) {
      return;
    }

    
    this.loading = true;
    Object.assign(this.bankobj, this.addBankForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);
    
    this._httpService.put(`/Banks/UpdateBank/${this.bankId}`,{id:this.bankId},this.bankobj,false).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success("تمت تعديل البنك بنجاح", "تم التعديل!", 

          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
        this.resetMyBankForm();
        this.closeModal();
        this.getAllBanks();
        this.loading = false;
      }
    },((err=>{
      this.loading = false;
    })),()=>{
      this.loading = false;

    })


}

}
