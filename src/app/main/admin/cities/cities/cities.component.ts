import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IModal } from '@core/@ui-components/modal/model/modal.interface';
import { ModalService } from '@core/@ui-components/modal/service/modal.service';
import { HttpService } from '@core/services/http.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { locale as arabic } from 'app/main/admin/cities/i18n/ar';
import { locale as english } from 'app/main/admin/cities/i18n/en';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { cities, small_columns, Table_Coloumns } from '../cities.model';
import { ValidationsService } from '@core/services/validations.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CitiesComponent implements OnInit {
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
  ItemsPerpage=30;
  public Table_Coloumns=Table_Coloumns
  public AddNewBtn={url:'/admin/banks/Add'}
  public small_columns=small_columns

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
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  cityobj= new cities();
  addCityForm:FormGroup;
cityId:any;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  addNewBankOptoinsModal:IModal;
  @ViewChild('addNewCity') addNewCity: ElementRef | undefined;
  
  constructor(private _coreTranslationService: CoreTranslationService,
    private _httpService:HttpService,
    private _ValidationsService: ValidationsService,
    private fb:FormBuilder,
    private _customModalService:ModalService,
    private  toastr:ToastrService,
    private route:ActivatedRoute) {
    this._coreTranslationService.translate(english, arabic);

  }



  ngOnInit(): void {
    this.addNewBankOptoinsModal = {
      headerTitle: 'اضافة مدينة جديدة',
      modalname: 'addNewCity',
    };
    this.getAllCities()
    this.initaddCityForm();
    this.contentHeader = {
      headerTitle: 'كل المدن',
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
            name: 'كل المدن',
            isLink: false
          }
        ]
      }
    };
  }


  
  initaddCityForm(){
    this.addCityForm=this.fb.group({
      cityName:[this.cityobj.cityName,[Validators.required]],
      cityNameAr:[this.cityobj.cityNameAr,[Validators.required]]
    });
    
  }
  get CityFormControls() {
    return this.addCityForm.controls;
  }

  validationControlls() {
    this.validationAllControlls =
      this._ValidationsService.checkIfControlsInValid(
        this.addCityForm,
        "addCityForm.formValidation"
      );
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
    this.allCities = temp;
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

  filterByPage(){
    this.getAllCities() 
  }

 
  getAllCities() {
    this.allCities=[];
    this._httpService.get('/Cities/GetAllCities',{CountItems:this.ItemsPerpage,page:1},false).subscribe((res: any) => {
      this.allCities = res.items
    });
  }

  resetcityForm(){
    this.submitted=false;
    this.addCityForm.reset();
    this.addCityForm.controls['cityNameAr'].setValidators(null);
    this.addCityForm.controls['cityNameAr'].updateValueAndValidity();
    this.addCityForm.controls['cityName'].setValidators(null)
    this.addCityForm.controls['cityName'].updateValueAndValidity();
    this.getAllCities()
  }

  OpenModal(){
    this.resetcityForm();
    this._customModalService.openModal(this.addNewCity, 'md');

  }

  EditCity(e:any){
    if (e.id > 0) {
      this.cityId = e.id;
      this.addNewBankOptoinsModal = {
        headerTitle: 'تعديل مدينة',
        modalname: 'addNewCity',
      };

      this._httpService.get('/Cities/GetCityById',{CountItems:10,page:1,id:this.cityId},false).subscribe((res: any) => {
        this.cityData = res.items[0]
  
        console.log('city data: ',this.cityData)
        this.addCityForm.patchValue(this.cityData as cities);

      });

      // this.type = "edit";
      this._customModalService.openModal(this.addNewCity, 'md');
    }
  }

  deleteBank(id: any) {
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف المدينة?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:"الغاء" ,
      confirmButtonText: "نعم احذف!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.delete('/cities',{Id:id}).subscribe((data: any) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: "تم حذف المدينة !" ,
              text: "تم حذف المدينة بنجاح",
              confirmButtonText: "نعم",
              showConfirmButton: true,
              timer: 1500
            }).then((result)=>{
             
              this.getAllCities();

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
    this._customModalService.dissmissMoadal(this.addNewCity);
    this.resetcityForm()
  }

  saveCity(){
    this.validationControlls()
    if (this.addCityForm.invalid) {
      return;
    }
    this.submitted = true;
    this.loading = true;
    Object.assign(this.cityobj, this.addCityForm?.value);    
    this._httpService.post('/Cities/AddCity',this.cityobj,false).subscribe((res: any) => {
      console.log('res',res);
      
      
      if (res) {
        this.toastr.success(
          "تمت اضافة المدينة بنجاح",
          "تم الاضافة!",
          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
        this.loading = false;
        this.resetcityForm();
      }
    },((err=>{
      this.loading = false;
    })),()=>{
      this.loading = false;

    })




  }

  updateCity(){
    this.submitted = true;

    console.log("form value: ",this.addCityForm.value)

    if (this.addCityForm.invalid) {
      return;
    }

    
    this.loading = true;
    Object.assign(this.cityobj, this.addCityForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);
    
    this._httpService.put(`/Cities/UpdateCity/${this.cityId}`,{id:this.cityId},this.cityobj,false).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success("تمت تعديل المدينة بنجاح", "تم التعديل!", 

          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
        this.resetcityForm();
        this.closeModal();
        this.getAllCities();
        this.loading = false;
      }
    },((err=>{
      this.loading = false;
    })),()=>{
      this.loading = false;

    })




  }
  }


