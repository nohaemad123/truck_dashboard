import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IModal } from '@core/@ui-components/modal/model/modal.interface';
import { ModalService } from '@core/@ui-components/modal/service/modal.service';
import { HttpService } from '@core/services/http.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
// import { BusinessTypes, Table_Coloumns } from '../models/buisness-types';

import Swal from 'sweetalert2';
import { Table_Coloumns, small_columns } from '../models/requests-trucks';

@Component({
  selector: 'app-all-requestes-trucks',
  templateUrl: './all-requestes-trucks.component.html',
  styleUrls: ['./all-requestes-trucks.component.scss']
})
export class AllRequestesTrucksComponent implements OnInit {

  public selectedOption = 10;
  contentHeader:any;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';

  selectedCityID:any;
  BusinessTypeId:any;
  // public SelectionType = SelectionType;
  public selected = [];
  allTrucks: any;
  trackData:any;

  public Table_Coloumns=Table_Coloumns
  public small_columns=small_columns
  
  public AddNewBtn={url:'/admin/Trucks/Add'}
  public allCities: any = [];

  public AllbusinessTypes: any = [];

  
  ItemsPerpage=30;
  public selectedRole = [];
  public selectedPlan = [];
  public selectedStatus = [];
  public searchValue = '';
  public selections:any[]=[];
  submitted=false;
   loading=false;
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  // buisnessobj= new Truck();
  addBuisnessForm:FormGroup;
buisnessId:any;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  addNewBuisnessOptoinsModal:IModal;
  @ViewChild('addNewBuisness') addNewBuisness: ElementRef | undefined;
  
  constructor(private _coreTranslationService: CoreTranslationService,
    private _httpService:HttpService,
    private fb:FormBuilder,
    private _customModalService:ModalService,
    private  toastr:ToastrService) {

  }







  changCheckBoxISApproved(event:any){
    console.log('eveeeeeent',event);
    // if(event.value==true){

    // }
let body={

    // "operationType": 0,
    "path": "/isApproved",
    "op": "replace",
    "value": `${event.value}`
    // "value":event.value
  
}
    if(event.row){
      this._httpService.patch(`/TruckData/${event.row.id}`,{},[body]).subscribe((res:any)=>{
        this.toastr.success("تم تعديل التراك", 'تم التعديل بنجاح!', {
          toastClass: 'toast ngx-toastr',
          closeButton: false
        });
     
        this.getAlTrucks();
     






        



        
      })
    }
    
  }
  CreateBuisnessForm(){
    // this.addBuisnessForm=this.fb.group({
    //   businessName:[this.buisnessobj.businessName,[Validators.required]],
    //   businessNameAr:[this.buisnessobj.businessNameAr,[Validators.required]],
    //   deliveryCommission:[this.buisnessobj.deliveryCommission,[Validators.required]]
    // });
    
  }

  ngOnInit(): void {
 

    this.addNewBuisnessOptoinsModal = {
      headerTitle: 'FORM.ADD_TITLE',
      modalname: 'addNewtrack',
    };
    this.getAlTrucks()
    this.CreateBuisnessForm()
    this.contentHeader = {
      headerTitle: 'كافة العربات الغير مقبوله',
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
            name: 'كافة العربات الغير مقبوله',
            isLink: false
          }
        ]
      }
    };
    this.getAllCities()
    this.getAllBuisness()
  }



  getAllCities() {
    this.allCities=[];
    this._httpService.get('/Cities/GetAllCities',{CountItems:10,page:1},false).subscribe((res: any) => {
      this.allCities = res.items

      // console.log('cities',this.allCities)
    });
  }




  getAllBuisness() {
    this.AllbusinessTypes=[];
    this._httpService.get('/BusinessTypes/GetAllBusinessTypes',{CountItems:10,page:1},false).subscribe((res: any) => {
      this.AllbusinessTypes = res.items

      // console.log('cities',this.AllbusinessTypes)
    });
  }


  // this._httpService.get('/').subscribe((res:any)=>{

  // });


  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
    filterUpdate(event) {
      this.searchValue=event.target.value;
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
  filterByCity() {
     this._httpService.get('/TruckData/GetTruckDataByCityId',{CityId:this.selectedCityID,CountItems:10,page:1},false).subscribe((res: any) => {
     this.allTrucks=[];
      this.allTrucks = res.items

    });
  }



  filterByBussinesTypeAndCity(){
    console.log('this.selectedCityID',this.selectedCityID);
    
    if((this.selectedCityID<=0 && this.BusinessTypeId<=0) || (this.selectedCityID==undefined && this.BusinessTypeId==undefined) ){
      Swal.fire({
        icon: 'warning',
        title: "تحذير",
        text: "لابد من اختيار مدينه ونوع نشاط اولا",
        showConfirmButton: false,
        timer: 1800
      })
      return ;
    }


    this._httpService.get('/TruckData/GetTruckDataByCityIdAndBusinessTypeId',{CityId:this.selectedCityID,BusinessTypeId:this.BusinessTypeId,CountItems:10,page:1},false).subscribe((res: any) => {
      this.allTrucks=[];
       this.allTrucks = res.items
 
     });
  }





  filterByBussinesType() {
    this._httpService.get('/TruckData/GetTruckDataByBusinessTypeId',{BusinessTypeId:this.BusinessTypeId,CountItems:10,page:1},false).subscribe((res: any) => {
    this.allTrucks=[];
     this.allTrucks = res.items

   });
 }




 filterByPage() {
  this.getAlTrucks();
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
    this.allTrucks = this.temp;
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
    this.allTrucks = this.temp;
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


  getAlTrucks() {
    this.allTrucks=[];
    this._httpService.get('/TruckData/GetAllTruckDataByIsApproved',{CountItems:this.ItemsPerpage,page:1},false).subscribe((res: any) => {
      this.allTrucks = res

      console.log('cities',this.allTrucks)
    });
  }




  deleteTrack(id: any) {
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف العربة المتنقلة?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:"الغاء" ,
      confirmButtonText: "نعم احذف!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.delete('/TruckData',{Id:id}).subscribe((data: any) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: "تم حذف العربة المتنقلة !" ,
              text: "تم حذف العربة المتنقلة بنجاح",
              confirmButtonText: "نعم",
              showConfirmButton: true,
              timer: 1500
            }).then((result)=>{
             
              this.getAlTrucks();

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

  }


}
