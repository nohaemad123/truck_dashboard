import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Notifications, Table_Coloumns, small_columns } from '../models/notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CoreTranslationService } from '@core/services/translation.service';
import { HttpService } from '@core/services/http.service';
import Swal from 'sweetalert2';
import { ModalService } from '@core/@ui-components/modal/service/modal.service';
import { IModal } from '@core/@ui-components/modal/model/modal.interface';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss']
})
export class UserNotificationsComponent implements OnInit {

  
  public selectedOption = 10;
  ItemsPerpage = 30;
  notifactionsForm: FormGroup;
  @ViewChild("SendNotficationsModal") SendNotficationsModal:
    | ElementRef
    | undefined;
  contentHeader: any;
  allUsers: any = [

  ];
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  // public SelectionType = SelectionType;
  public selected = [];
  allNotifications: any;
  sendNotifactionsOptoinsModal: IModal;
  cityData: any;
  public small_columns = small_columns;
  id:any;
  arrfillter = ["bannerTitle", "bannerDescription"];
  public Table_Coloumns = Table_Coloumns
  public selectRole: any = [
    { name: 'All', value: '' },
    { name: 'Admin', value: 'Admin' },
    { name: 'Author', value: 'Author' },
    { name: 'Editor', value: 'Editor' },
    { name: 'Maintainer', value: 'Maintainer' },
    { name: 'Subscriber', value: 'Subscriber' }
  ];

  notificationObj = new Notifications();
  imageFile = {
    isUpload: false,
    localUrl: "assets/images/upload/image-preview.jpg",
    id: "",
    progress: 0,
  };

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
  public selections: any[] = [];
  submitted = false;
  loading = false;
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  cityId: any;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  constructor(private _coreTranslationService: CoreTranslationService,
    private _httpService: HttpService,
    private _customModalService: ModalService,
    private route:ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    // this._coreTranslationService.translate(english, arabic);
  }



  ngOnInit(): void {

    this.getAllNotifications()
    this.sendNotifactionsOptoinsModal = {
      headerTitle: 'اضافة اشعار جديد',
      modalname: 'SendNotficationsModal',
    };

    this.InitNotifactionsForm()

    this.contentHeader = {
      headerTitle: 'كل الاشعارات',
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
            name: 'كل الاشعارات',
            isLink: false
          }
        ]
      }
    };


    this.getAllUsers()
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
    this.allNotifications = temp;
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
    this.allNotifications = this.temp;
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
    this.allNotifications = this.temp;
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
    this.allNotifications = this.temp;
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

  get notifactionsFormControls() {
    return this.notifactionsForm.controls;
  }

  InitNotifactionsForm() {
    this.notifactionsForm = this.fb.group({
      // userId: [""],
      // title: ["", [Validators.required]],
      // body: [""],
      // image: [""],
      // date: [new Date()],
      userId: [this.notificationObj.userId],
      title: [this.notificationObj.title, [Validators.required]],
      body: [this.notificationObj.body],
      image: [this.notificationObj.image],
      date: [this.notificationObj.date],
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


  filterByPage() {
    this.getAllNotifications();
  }
  getAllNotifications() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.id = this.route.snapshot.paramMap.get('id')!;
        this.allNotifications = [];
        this._httpService.get('/Notifications/GetAllNotificationByUserId', {UserId:this.id}, false).subscribe((res: any) => {
          this.allNotifications = res
    
    
          console.log('cities', this.allNotifications)
        });
      }
    })
  
  }

  getAllUsers() {
    this.allUsers = [];
    this._httpService
      .get(
        "/Users/GetAllUsers",
        { CountItems: 100, page: 1 },
        false
      )
      .subscribe((res: any) => {
        this.allUsers = res.items;

        this.allUsers.unshift({
          id: 0,
          username: "الكل"

        })
        console.log("cities", this.allUsers);
      });
  }

  resetMyBankForm() {
    this.submitted = false;
    this.notifactionsForm.reset();
    this.getAllNotifications()
  }

  OpenModal() {
    this.resetMyBankForm();
    this._customModalService.openModal(this.SendNotficationsModal, 'md');

  }






  closeModal() {
    this._customModalService.dissmissMoadal(this.SendNotficationsModal);
    this.resetMyBankForm()
    this.getAllNotifications()

  }


  SendNotfication() {
    this.submitted = true;

    console.log("form value: ", this.notifactionsForm.value);

    if (this.notifactionsForm.invalid) {
      return;
    }

    this.loading = true;
    var usersId = this.notifactionsForm.controls['userId'].value
    if (usersId.length > 10) {
      this.toastr.error("لا يجب ان يزيد عدد المستخدمين عن 10", "انبيه!", {
        toastClass: "toast ngx-toastr",
        closeButton: true,
      });
    } else {
      for (let i = 0; i < usersId.length; i++) {

        delete this.notifactionsForm.value.userId;
        delete this.notifactionsForm.value.date;


        Object.assign(this.notificationObj, this.notifactionsForm?.value);
        this.notificationObj.userId = this.notifactionsForm.controls['userId'].value[i]
        this.notificationObj.date = new Date()
        this._httpService
          .post("/Notifications/PushNotificationForUser", this.notificationObj, false)
          .subscribe(
            (res: any) => {
              console.log(res);
              if (res) {
                this.toastr.success("تم ارسال الاشعار بنجاح", "تم الارسال!", {
                  toastClass: "toast ngx-toastr",
                  closeButton: true,
                });
                this.resetMyBankForm();
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
      }
    }
    // }

    console.log("  this.notifactionsForm: ", this.notifactionsForm.value)
  }

}
