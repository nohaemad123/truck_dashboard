import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IModal } from "@core/@ui-components/modal/model/modal.interface";
import { ModalService } from "@core/@ui-components/modal/service/modal.service";
import { HttpService } from "@core/services/http.service";
import { CoreTranslationService } from "@core/services/translation.service";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
// import { BusinessTypes, Table_Coloumns } from '../models/buisness-types';
import { locale as arabic } from "app/main/admin/truks/i18n/ar";
import { locale as english } from "app/main/admin/truks/i18n/en";
import Swal from "sweetalert2";
import { Table_Coloumns, small_columns } from "../models/truks";
import { Router } from "@angular/router";
import { log } from "console";

@Component({
  selector: "app-truks",
  templateUrl: "./truks.component.html",
  styleUrls: ["./truks.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TruksComponent implements OnInit {
  public selectedOption = 10;
  contentHeader: any;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = "";
  public previousPlanFilter = "";
  public previousStatusFilter = "";

  selectedCityID: any;
  BusinessTypeId: any;
  // public SelectionType = SelectionType;
  public selected = [];
  allTrucks: any;
  trackData: any;

  public Table_Coloumns = Table_Coloumns;
  public small_columns = small_columns;

  public AddNewBtn = { url: "/admin/Trucks/Add" };
  public allCities: any = [];

  public AllbusinessTypes: any = [];

  arrfillter = ["truckName", "businessName", "cityName"];
  ItemsPerpage = 30;
  public selectedRole = [];
  public selectedPlan = [];
  public selectedStatus = [];
  public searchValue = "";
  public selections: any[] = [];
  submitted = false;
  loading = false;
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  // buisnessobj= new Truck();
  addBuisnessForm: FormGroup;
  buisnessId: any;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  addNewBuisnessOptoinsModal: IModal;
  @ViewChild("addNewBuisness") addNewBuisness: ElementRef | undefined;

  constructor(
    private _coreTranslationService: CoreTranslationService,
    private _httpService: HttpService,
    private fb: FormBuilder,

    private _customModalService: ModalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this._coreTranslationService.translate(english, arabic);
  }

  changCheckBoxISApproved(event: any) {
    console.log("eveeeeeent", event);
    // if(event.value==true){

    // }
    let body = {
      // "operationType": 0,
      path: "/isApproved",
      op: "replace",
      value: `${event.value}`,
      // "value":event.value
    };
    if (event.row) {
      this._httpService
        .patch(`/TruckData/${event.row.id}`, {}, [body])
        .subscribe((res: any) => {
          this.toastr.success("تم تعديل التراك", "تم التعديل بنجاح!", {
            toastClass: "toast ngx-toastr",
            closeButton: false,
          });

          this.getAlTrucks();
        });
    }
  }
  CreateBuisnessForm() {
    // this.addBuisnessForm=this.fb.group({
    //   businessName:[this.buisnessobj.businessName,[Validators.required]],
    //   businessNameAr:[this.buisnessobj.businessNameAr,[Validators.required]],
    //   deliveryCommission:[this.buisnessobj.deliveryCommission,[Validators.required]]
    // });
  }

  ngOnInit(): void {
    this.addNewBuisnessOptoinsModal = {
      headerTitle: "FORM.ADD_TITLE",
      modalname: "addNewtrack",
    };
    this.getAlTrucks();
    this.CreateBuisnessForm();
    this.contentHeader = {
      headerTitle: "كافة العربات المتنقلة",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "الرئيسية",
            isLink: true,
            link: "/",
          },
          {
            name: "كافة العربات المتنقلة",
            isLink: false,
          },
        ],
      },
    };
    this.getAllCities();
    this.getAllBuisness();
  }

  getAllCities() {
    this.allCities = [];
    this._httpService
      .get("/Cities/GetAllCities", { CountItems: 10, page: 1 }, false)
      .subscribe((res: any) => {
        this.allCities = res.items;

        // console.log('cities',this.allCities)
      });
  }

  getAllBuisness() {
    this.AllbusinessTypes = [];
    this._httpService
      .get(
        "/BusinessTypes/GetAllBusinessTypes",
        { CountItems: 10, page: 1 },
        false
      )
      .subscribe((res: any) => {
        this.AllbusinessTypes = res.items;

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
    this.searchValue = event.target.value;
  }

  /**
   * For ref only, log selected values
   *
   * @param selected
   */
  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByCity() {
    this._httpService
      .get(
        "/TruckData/GetTruckDataByCityId",
        { CityId: this.selectedCityID, CountItems: 10, page: 1 },
        false
      )
      .subscribe((res: any) => {
        this.allTrucks = [];
        this.allTrucks = res.items;
        this.allTrucks.map((truck: any) => {
          truck.trackRating = truck.truckRatings[0]
            ? truck.truckRatings[0].ratingCount
            : 0;
        });
      });
  }

  filterByBussinesTypeAndCity() {
    console.log("this.selectedCityID", this.selectedCityID);

    if (
      (this.selectedCityID <= 0 && this.BusinessTypeId <= 0) ||
      (this.selectedCityID == undefined && this.BusinessTypeId == undefined)
    ) {
      Swal.fire({
        icon: "warning",
        title: "تحذير",
        text: "لابد من اختيار مدينه او نوع نشاط اولا",
        showConfirmButton: false,
        timer: 2000,
      });
      this.getAlTrucks();
      return;
    }

    if (this.selectedCityID && this.BusinessTypeId) {
      this.GetTruckDataByCityIdAndBusinessTypeId();
    } else if (this.selectedCityID && this.BusinessTypeId == undefined) {
      this.filterByCity();
    } else if (this.BusinessTypeId && this.selectedCityID == undefined) {
      this.filterByBussinesType();
    }
  }

  GetTruckDataByCityIdAndBusinessTypeId() {
    this._httpService
      .get(
        "/TruckData/GetTruckDataByCityIdAndBusinessTypeId",
        {
          CityId: this.selectedCityID ? this.selectedCityID : 0,
          BusinessTypeId: this.BusinessTypeId ? this.BusinessTypeId : 0,
          CountItems: 10,
          page: 1,
        },
        false
      )
      .subscribe((res: any) => {
        this.allTrucks = [];
        this.allTrucks = res.items;
        this.allTrucks.map((truck: any) => {
          truck.trackRating = truck.truckRatings[0]
            ? truck.truckRatings[0].ratingCount
            : 0;
        });
      });
  }

  filterByBussinesType() {
    this._httpService
      .get(
        "/TruckData/GetTruckDataByBusinessTypeId",
        { BusinessTypeId: this.BusinessTypeId, CountItems: 10, page: 1 },
        false
      )
      .subscribe((res: any) => {
        this.allTrucks = [];
        this.allTrucks = res.items;
        this.allTrucks.map((truck: any) => {
          truck.trackRating = truck.truckRatings[0]
            ? truck.truckRatings[0].ratingCount
            : 0;
        });
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
    const filter = event ? event.value : "";
    this.previousPlanFilter = filter;
    this.temp = this.filterRows(
      this.previousRoleFilter,
      filter,
      this.previousStatusFilter
    );
    this.allTrucks = this.temp;
  }

  /**
   * Filter By Status
   *
   * @param event
   */
  filterByStatus(event) {
    const filter = event ? event.value : "";
    this.previousStatusFilter = filter;
    this.temp = this.filterRows(
      this.previousRoleFilter,
      this.previousPlanFilter,
      filter
    );
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
    this.searchValue = "";

    roleFilter = roleFilter.toLowerCase();
    planFilter = planFilter.toLowerCase();
    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter((row) => {
      const isPartialNameMatch =
        row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
      const isPartialGenderMatch =
        row.currentPlan.toLowerCase().indexOf(planFilter) !== -1 || !planFilter;
      const isPartialStatusMatch =
        row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch && isPartialGenderMatch && isPartialStatusMatch;
    });
  }

  getAlTrucks() {
    this.allTrucks = [];
    this._httpService
      .get(
        "/TruckData/GetAllTruckData",
        { CountItems: this.ItemsPerpage, page: 1 },
        false
      )
      .subscribe((res: any) => {
        this.allTrucks = res.items;
        this.allTrucks.map((truck: any) => {
          truck.trackRating = truck.truckRatings[0]
            ? truck.truckRatings[0].ratingCount
            : 0;
        });
      });
  }

  // admin/Trucks/View
  goToTrucks(event: any) {
    if (event.id > 0) {
      // console.log('rrrrrrrrrow',event.row.trackRating);

      this.router.navigate(["admin/Trucks/View", event.id], {
        queryParams: {
          rating: event.row.trackRating,
        },
      });
    }
  }

  deleteTrack(id: any) {
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف العربة المتنقلة?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "الغاء",
      confirmButtonText: "نعم احذف!",
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService
          .delete("/TruckData", { Id: id })
          .subscribe((data: any) => {
            // console.log(data);
            if (data) {
              Swal.fire({
                icon: "success",
                title: "تم حذف العربة المتنقلة !",
                text: "تم حذف العربة المتنقلة بنجاح",
                confirmButtonText: "نعم",
                showConfirmButton: true,
                timer: 1500,
              }).then((result) => {
                this.getAlTrucks();
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "error",
                text: data.responseMessage,
                showConfirmButton: true,
                timer: 1500,
              });
            }
          });
      }
    });
  }

  closeModal() {
    this._customModalService.dissmissMoadal(this.addNewBuisness);
  }
}
