import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IModal } from "@core/@ui-components/modal/model/modal.interface";
import { CoreTranslationService } from "@core/services/translation.service";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { Subject } from "rxjs";
import { Table_Coloumns, CUsers, small_columns } from "../models/users";
import { locale as arabic } from "app/main/admin/user/i18n/ar";
import { locale as english } from "app/main/admin/user/i18n/en";
import { HttpService } from "@core/services/http.service";
import { ModalService } from "@core/@ui-components/modal/service/modal.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { User } from "app/auth/models";
import Swal from "sweetalert2";
import { HttpEventType } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit {
  sendNotifactionsOptoinsModal: IModal;
  @ViewChild("SendNotficationsModal") SendNotficationsModal:
    | ElementRef
    | undefined;

  public selectedOption = 10;
  ItemsPerpage = 30;
  contentHeader: any;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = "";
  public previousPlanFilter = "";
  public previousStatusFilter = "";
  // public SelectionType = SelectionType;
  public selected = [];
  allUsers: any;
  cityData: any;

  public Table_Coloumns = Table_Coloumns;
  public small_columns = small_columns;

  public AddNewBtn = { url: "/admin/banks/Add" };
  public selectRole: any = [
    { name: "All", value: "" },
    { name: "Admin", value: "Admin" },
    { name: "Author", value: "Author" },
    { name: "Editor", value: "Editor" },
    { name: "Maintainer", value: "Maintainer" },
    { name: "Subscriber", value: "Subscriber" },
  ];

  public selectPlan: any = [
    { name: "All", value: "" },
    { name: "Basic", value: "Basic" },
    { name: "Company", value: "Company" },
    { name: "Enterprise", value: "Enterprise" },
    { name: "Team", value: "Team" },
  ];

  public selectStatus: any = [
    { name: "All", value: "" },
    { name: "Pending", value: "Pending" },
    { name: "Active", value: "Active" },
    { name: "Inactive", value: "Inactive" },
  ];

  imageFile = {
    isUpload: false,
    localUrl: "assets/images/upload/image-preview.jpg",
    id: "",
    progress: 0,
  };

  public selectedRole = [];
  public selectedPlan = [];
  public selectedStatus = [];
  public searchValue = "";
  public selections: any[] = [];
  submitted = false;
  loading = false;
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  userobj = new CUsers();
  notifactionsForm: FormGroup;
  cityId: any;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _coreTranslationService: CoreTranslationService,
    private _httpService: HttpService,
    private toastr: ToastrService,

    private fb: FormBuilder,
    private _customModalService: ModalService
  ) {
    this._coreTranslationService.translate(english, arabic);
  }

  get notifactionsFormControls() {
    return this.notifactionsForm.controls;
  }

  InitNotifactionsForm() {
    this.notifactionsForm = this.fb.group({
      userId: [""],
      title: ["", [Validators.required]],
      body: [""],
      image: [""],
      date: [new Date()],
    });
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageFile.localUrl = event.target.result;
        // console.log('event.target.result;',event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      var file = event.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      // this.successRemoveImg = true;
      this._httpService
        .uploadImageWithPipe(formData)
        .pipe(
          map((event: any) => {
            if (event.type == HttpEventType.UploadProgress) {
              this.imageFile.progress = Math.round(
                (event.loaded / event.total) * 100
              );

              // this.groupServ.progessEmitEvent(
              //   this.progress
              // );
            } else if (event.type == HttpEventType.Response) {
              if (event.body) {
                if (event.body.data) {
                  this.imageFile.isUpload = true;
                  // this.imageFile.localUrl =
                  //   environment.urlApiFile + event.body.data;
                  this.notifactionsForm.controls.image.setValue(
                    event.body.data
                  );
                } else {
                  this.imageFile.progress = null;
                  this.imageFile.isUpload = false;
                }
              } else {
                this.imageFile.progress = null;
                this.imageFile.isUpload = false;
              }
            }
          })
        )
        .subscribe();
    }
  }

  removeImage() {
    this.imageFile.localUrl = "assets/images/upload/image-preview.jpg";
    this.notifactionsForm.controls["image"].setValue(null);
  }

  closeModal() {
    this._customModalService.dissmissMoadal(this.SendNotficationsModal);
  }

  openNotficationModal($event) {
    if ($event.id > 0 && $event.modal == "SendNotficationsModal") {
      this.notifactionsForm.controls["userId"].setValue($event.id);
      this._customModalService.openModal(this.SendNotficationsModal, "md");
    }
    //  console.log();
  }

  SendNotfication() {
    this.submitted = true;

    console.log("form value: ", this.notifactionsForm.value);

    if (this.notifactionsForm.invalid) {
      return;
    }

    this.loading = true;

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .post("/Notifications/PushNotificationForUser",this.notifactionsForm.value, false)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم ارسال الاشعار بنجاح", "تم الارسال!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            this.resetNotifactionsForm();
            this.loading = false;
          }
        },
        (err) => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  ngOnInit(): void {
    this.sendNotifactionsOptoinsModal = {
      headerTitle: "ارسال اشعار",
      modalname: "SendNotficationsModal",
    };

    this.getAllUsers();
    this.InitNotifactionsForm();
    this.contentHeader = {
      headerTitle: "كل المستخدمين",
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
            name: "كل المستخدمين",
            isLink: false,
          },
        ],
      },
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
    this.allUsers = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
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
  filterByRole(event) {
    const filter = event ? event.value : "";
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(
      filter,
      this.previousPlanFilter,
      this.previousStatusFilter
    );
    this.allUsers = this.temp;
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
    this.allUsers = this.temp;
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
    this.allUsers = this.temp;
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

  filterByPage() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.allUsers = [];
    this._httpService
      .get(
        "/Users/GetAllUsers",
        { CountItems: this.ItemsPerpage, page: 1 },
        false
      )
      .subscribe((res: any) => {
        this.allUsers = res.items;
        // this.allUsers.forEach(element => {
         
          
        //   switch (element.userTypeId) {
        //     case 1:
        //       element.userType='مستخدم'
        //       break;
        //       case 2:
        //         element.userType='صاحب العربة المتنقلة'

        //       break;

        //       case 3:
        //         element.userType='ادمن'

        //       break;
        //     default:
        //       break;
        //   }
        
        // });

        // console.log("cities", this.allUsers);
      });
  }

  resetNotifactionsForm() {
    this.submitted = false;
    this.notifactionsForm.reset();
    this.closeModal();
  }

  deleteUser(id: any) {
    console.log(this.selections);
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف المستخدم?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "الغاء",
      confirmButtonText: "نعم احذف!",
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService
          .delete("/Users", { Id: id })
          .subscribe((data: any) => {
            // console.log(data);
            if (data) {
              Swal.fire({
                icon: "success",
                title: "تم حذف المستخدم !",
                text: "تم حذف المستخدم بنجاح",
                confirmButtonText: "نعم",
                showConfirmButton: true,
                timer: 1500,
              }).then((result) => {
                this.getAllUsers();
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
}
