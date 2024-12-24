import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Banners, Table_Coloumns, small_columns } from '../models/bannars';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { CoreTranslationService } from '@core/services/translation.service';
import { HttpService } from '@core/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-bannars',
  templateUrl: './all-bannars.component.html',
  styleUrls: ['./all-bannars.component.scss']
})
export class AllBannarsComponent implements OnInit {

  
  public selectedOption = 10;
  ItemsPerpage=30;
  contentHeader:any;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  // public SelectionType = SelectionType;
  public selected = [];
  allBanners: any;
  cityData:any;
  public small_columns = small_columns;
  arrfillter = ["bannerTitle", "bannerDescription"];
  public Table_Coloumns=Table_Coloumns
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
  userobj= new Banners();
cityId:any;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  
  constructor(private _coreTranslationService: CoreTranslationService,
    private _httpService:HttpService,
    private fb:FormBuilder) {
    // this._coreTranslationService.translate(english, arabic);
  }

 

  ngOnInit(): void {
   
    this.getAllUsers()
    this.contentHeader = {
      headerTitle: 'كل البنرز',
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
            name: 'كل البنرز',
            isLink: false
          }
        ]
      }
    };
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
    this.allBanners = temp;
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
    this.allBanners = this.temp;
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
    this.allBanners = this.temp;
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
    this.allBanners = this.temp;
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



  filterByPage() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.allBanners=[];
    this._httpService.get('/Banners/GetAllBanners',{CountItems:this.ItemsPerpage,page:1},false).subscribe((res: any) => {
      this.allBanners = res.items
      // this.allBanners.forEach((elem=>{
      //   elem.bannerTitle='master-builder of human happiness';
      // elem.bannerLink="الهوم"
      //   elem.country="مصر",
      //   elem.subscriptionStatus="active",
      //   elem.image='assets/images/truck1.svg'
      //   elem.sequence='1'
      //   elem.CreatedDate=new Date().toString();

      // }))
      console.log('cities',this.allBanners)
    });
  }


  deleteBanner(id: any) {
    console.log(    this.selections
      )
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف البنر?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:"الغاء" ,
      confirmButtonText: "نعم احذف!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.delete('/Banners',{Id:id}).subscribe((data: any) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: "تم حذف البنر !" ,
              text: "تم حذف البنر بنجاح",
              confirmButtonText: "نعم",
              showConfirmButton: true,
              timer: 1500
            }).then((result)=>{
             
              this.getAllUsers();

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


}
