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
import { Table_Coloumns, SMS, small_columns } from "../models/sms";
import { locale as arabic } from "app/main/admin/sms/i18n/ar";
import { locale as english } from "app/main/admin/user/i18n/en";
import { HttpService } from "@core/services/http.service";
import { ModalService } from "@core/@ui-components/modal/service/modal.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { User } from "app/auth/models";
import Swal from "sweetalert2";
import { HttpEventType } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ValidationsService } from "@core/services/validations.service";
@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.scss'],
  encapsulation:ViewEncapsulation.None

})


export class SendSmsComponent implements OnInit {
  sendNotifactionsOptoinsModal: IModal;
  @ViewChild("SendSmsModal") SendSmsModal:
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
  validationAllControlls: string;

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
  smsobj = new SMS();
  SmsForm: FormGroup;
  cityId: any;
  allSms:any;
  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _coreTranslationService: CoreTranslationService,
    private _httpService: HttpService,
    private toastr: ToastrService,
    private _ValidationsService: ValidationsService,
    private fb: FormBuilder,
    private _customModalService: ModalService
  ) {
    this._coreTranslationService.translate(english, arabic);
  }

  get SmsFormControls() {
    return this.SmsForm.controls;
  }

  InitSmsForm() {
    this.SmsForm = this.fb.group({
      userId:[''],
      body: [this.smsobj.body,Validators.required],
      SmsUsers:[[]]
    });
  }

 

  resetMyBankForm() {
    this.submitted = false;
    this.SmsForm.reset();
    this.SmsForm.controls["userId"].enable();
    // this.getAllSms()
  }

  OpenModal() {
    this.resetMyBankForm();
    this._customModalService.openModal(this.SendSmsModal, 'md');

  }

  validationControlls() {
    this.validationAllControlls =
      this._ValidationsService.checkIfControlsInValid(
        this.SmsForm,
        "SmsForm.formValidation"
      );
  }




  closeModal() {
    this._customModalService.dissmissMoadal(this.SendSmsModal);
    this.resetMyBankForm()
    this.SmsForm.controls["userId"].enable();
    this.getAllSms()
  }
  

  opeSmsModal($event) {
    if ($event.id > 0 && $event.modal == "SendSmsModal") {
      console.log('$event',$event.row);
            this._customModalService.openModal(this.SendSmsModal, "md");
    }
    //  console.log();
  }

  SendSms() {
    this.submitted = true;
    this.SmsUsers.map((elem:any)=>{
      elem.number=elem.number.substring(1,elem.number.length);
      elem.msg=this.SmsForm.get('body')?.value;
    })
    this.SmsForm.controls['SmsUsers'].setValue(this.SmsUsers);
    console.log("form value: ", this.SmsForm.value);

    if (this.SmsForm.invalid) {
      return;
    }
    this.loading = true;
        this._httpService
          .post("/SendSms/AddSendSms",this.SmsForm.controls['SmsUsers'].value, false)
          .subscribe(
            (res: any) => {
              console.log(res);
              if (res) {
                this.toastr.success("تم ارسال الرساله بنجاح", "تم الارسال!", {
                  toastClass: "toast ngx-toastr",
                  closeButton: true,
                });
                this.resetMyBankForm();
                this.SmsForm.controls["userId"].enable();
                this.loading = false;
              }
            },
            (err) => {
              this.loading = false;
            },
            () => {
              this.loading = false;
            }
          )
    //   }
    // }
  }

  ngOnInit(): void {
    this.sendNotifactionsOptoinsModal = {
      headerTitle: "ارسال رساله",
      modalname: "SendSmsModal",
    };

    this.getAllSms()

    this.getAllUsers();
    this.getAllUsersForFilter()
    this.InitSmsForm();
    this.contentHeader = {
      headerTitle: "كل الرسائل",
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
            name: "كل الرسائل",
            isLink: false,
          },
        ],
      },
    };
  }

  getAllSms(){
    this.allSms = [];
    this._httpService.get('/SendSms/GetAllSendSms', {CountItems:this.ItemsPerpage,page:1}, false).subscribe((res: any) => {
      this.allSms = res.items


      // console.log('cities', this.allSms)
    });
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
    if(this.userPhone.length>0){
      this.getAllSmsForUser();
      return 0;
    }
    this.getAllSms();
  }
  getAllUsers() {
    this.allUsers = [];
    this._httpService
      .get(
        "/Users/GetAllUsers",
        { CountItems: 10000, page: 1 },
        false
      )
      .subscribe((res: any) => {
        this.allUsers = res.items;
        this.allUsers.unshift({
          id: 0,
          userNameAr: "الكل"

        })
        console.log("allUsers", this.allUsers);
      });
  }


  allUsersForFilter=[];
  userPhone:any;
  getAllUsersForFilter() {
    this.allUsersForFilter = [];
    this._httpService
      .get(
        "/Users/GetAllUsers",
        { CountItems: 10000, page: 1 },
        false
      )
      .subscribe((res: any) => {
        this.allUsersForFilter = res.items;
       
      });
  }


  
  showSmsForUser(){
    if(!this.userPhone){
      this.toastr.warning("اختر مستخدم لعرض الرسائل ", "", {
        toastClass: "toast ngx-toastr",
        closeButton: true,
      });
      this.getAllSms();
    }else{
      this.getAllSmsForUser();
    }
  }



  getAllSmsForUser(){
    console.log('userPhone',this.userPhone);
    let phone =this.userPhone.substring(1,this.userPhone.length);
    
    this.allSms = [];
    this._httpService
      .get("/SendSms/GetAllSendSmsByPhoneNumber",{PhoneNumber:phone,CountItems:this.ItemsPerpage,page:1}, false)
      .subscribe((res: any) => {
        this.allSms = res.items;
      });
  }




  SmsUsers:any=[];
  selectUser(event:any){
    this.SmsUsers=[];
    if(this.SmsForm.controls['userId'].value[0]===0){
      this.SmsForm.controls["userId"].disable();
    }

    console.log('event',event);
    // event.find()



    let index =event
    .map(function (elem) {
      return elem.id;
    })
    .indexOf(0);
  if (index > -1) {

    this.allUsers.forEach(element => {
      this.SmsUsers.push({
        id: 0,
        number: element.phoneNumber,
        msg: this.SmsForm.get('body').value
      });
    });
   
    this.SmsUsers.splice(index,1);
  } else {
    event.forEach(element => {
      this.SmsUsers.push({
        id: 0,
        number: element.phoneNumber,
        msg: this.SmsForm.get('body').value
      });
    });


  }


  }

  resetSmsForm() {
    this.submitted = false;
    this.SmsForm.reset();
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
