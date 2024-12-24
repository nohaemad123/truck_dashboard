import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IModal } from '@core/@ui-components/modal/model/modal.interface';
import { ModalService } from '@core/@ui-components/modal/service/modal.service';
import { HttpService } from '@core/services/http.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { BusinessTypes, Table_Coloumns, small_columns } from '../models/buisness-types';
import { locale as arabic } from 'app/main/admin/bussines-types/i18n/ar';
import { locale as english } from 'app/main/admin/bussines-types/i18n/en';
import Swal from 'sweetalert2';
import { ValidationsService } from '@core/services/validations.service';
import { ArabicValidation } from '@core/directives/arabic-validation/arabic-validation';

@Component({
  selector: 'app-bussines-types',
  templateUrl: './bussines-types.component.html',
  styleUrls: ['./bussines-types.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class BussinesTypesComponent implements OnInit {
  validationAllControlls: string;
  public selectedOption = 10;
  contentHeader:any;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  // public SelectionType = SelectionType;
  public selected = [];
  allCities: any;
  cityData:any;

  public Table_Coloumns=Table_Coloumns
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
   ItemsPerpage=30;
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  buisnessobj= new BusinessTypes();
  addBuisnessForm:FormGroup;
buisnessId:any;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  addNewBuisnessOptoinsModal:IModal;
  @ViewChild('addNewBuisness') addNewBuisness: ElementRef | undefined;
  public small_columns=small_columns

  constructor(private _coreTranslationService: CoreTranslationService,
    private _httpService:HttpService,
    private fb:FormBuilder,
    private _ValidationsService: ValidationsService,
    private _customModalService:ModalService,
    private  toastr:ToastrService) {
    this._coreTranslationService.translate(english, arabic);

  }

  get buisnessFormControls() {
    return this.addBuisnessForm.controls;
  }

  CreateBuisnessForm(){
    this.addBuisnessForm=this.fb.group({
      businessName:[this.buisnessobj.businessName,[Validators.required]],
      businessNameAr:[this.buisnessobj.businessNameAr,[Validators.required]],
      deliveryCommission:[this.buisnessobj.deliveryCommission,[Validators.required]]
    });
    
  }

  validationControlls() {
    this.validationAllControlls =
      this._ValidationsService.checkIfControlsInValid(
        this.addBuisnessForm,
        "addBuisnessForm.formValidation"
      );
  }

  closeMessageErrors() {
    this.submitted = false;
  }

  ngOnInit(): void {
    this.addNewBuisnessOptoinsModal = {
      headerTitle: 'اضافة نوع نشاط',
      modalname: 'addNewCity',
    };
    this.getAllBuisness()
    this.CreateBuisnessForm()
    this.contentHeader = {
      headerTitle: 'كل انواع الانشطة',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'الرئيسية',
            isLink: true,
            link: '/'
          },
          {
            name: 'كل انواع الانشطة',
            isLink: false
          }
        ]
      }
    };
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  filterUpdate(event) {
    this.searchValue=event.target.value;
  }


  filterByPage() {
    this.getAllBuisness();
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
    this.allCities = this.temp;
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
    this.allCities = this.temp;
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
    this.allCities = this.temp;
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


  getAllBuisness() {
    this.allCities=[];
    this._httpService.get('/BusinessTypes/GetAllBusinessTypes',{CountItems:this.ItemsPerpage,page:1},false).subscribe((res: any) => {
      this.allCities = res.items

      // console.log('cities',this.allCities)
    });
  }

  resetMyBankForm(){
    this.submitted=false;
    this.addBuisnessForm.reset()
    this.buisnessFormControls.businessNameAr.setErrors(null);
    this.getAllBuisness()
  }

  OpenModal(){
    this.resetMyBankForm();
    this._customModalService.openModal(this.addNewBuisness, 'md');

  }

  EditCity(e:any){
    if (e.id > 0) {
      this.buisnessId = e.id;
      console.log("id: ",this.buisnessId)
      this.addNewBuisnessOptoinsModal = {
        headerTitle: 'تعديل نوع النشاط',
        modalname: 'addNewCity',
      };

      this._httpService.get('/BusinessTypes/GetBusinessTypeId',{CountItems:10,page:1,id:this.buisnessId},false).subscribe((res: any) => {
        this.cityData = res.items[0]
  
        console.log('city data: ',this.cityData)
        this.addBuisnessForm.patchValue(this.cityData as BusinessTypes);

      });

      // this.type = "edit";
      this._customModalService.openModal(this.addNewBuisness, 'md');
    }
  }

  deleteBank(id: any) {
    console.log(    this.selections
      )
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف نوع الانشطة?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:"الغاء" ,
      confirmButtonText: "نعم احذف!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.delete('/BusinessTypes',{Id:id}).subscribe((data: any) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: "تم حذف نوع الانشطة !" ,
              text: "تم حذف نوع الانشطة بنجاح",
              confirmButtonText: "نعم",
              showConfirmButton: true,
              timer: 1500
            }).then((result)=>{
             
              this.getAllBuisness();

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

  closeModal(){
    this._customModalService.dissmissMoadal(this.addNewBuisness);
    this.resetMyBankForm();
    this.getAllBuisness()


  }

  saveCity(){
    this.submitted = true;
    this.validationControlls();

    console.log("form value: ",this.addBuisnessForm.value)

    if (this.addBuisnessForm.invalid) {
      return;
    }

    
    this.loading = true;
    Object.assign(this.buisnessobj, this.addBuisnessForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);
    
    this._httpService.post('/BusinessTypes/AddBusinessType',this.buisnessobj,false).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success(
          "تمت اضافة نوع النشاط بنجاح",
          "تم الاضافة!",
          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
        this.resetMyBankForm();
        // this.closeModal();
        // this.getAllBuisness();
        this.loading = false;
      }
    },((err=>{
      this.loading = false;
    })),()=>{
      this.loading = false;

    })




  }

  updateCity(){
    this.submitted = true;

    console.log("form value: ",this.addBuisnessForm.value)

    if (this.addBuisnessForm.invalid) {
      return;
    }

    
    this.loading = true;
    Object.assign(this.buisnessobj, this.addBuisnessForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);
    
    this._httpService.put(`/BusinessTypes/UpdateBusinessType/${this.buisnessId}`,null,this.buisnessobj,false).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success(
          "تم تعديل نوع النشاط بنجاج",
          "تعم التعديل!",
          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
        this.resetMyBankForm();
        this.closeModal();
        this.getAllBuisness();
        this.loading = false;
      }
    },((err=>{
      this.loading = false;
    })),()=>{
      this.loading = false;

    })




  }

}
