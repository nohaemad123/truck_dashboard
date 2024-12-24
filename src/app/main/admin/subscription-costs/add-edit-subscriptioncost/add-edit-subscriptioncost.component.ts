import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Subscriptions } from '../models/all-asubscriptioncost';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-subscriptioncost',
  templateUrl: './add-edit-subscriptioncost.component.html',
  styleUrls: ['./add-edit-subscriptioncost.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditSubscriptioncostComponent implements OnInit {

  contentHeader:any;

  countryData:any=[
    {
      name:"مصر",
      value:1
    },
    {
      name:"السعودية",
      value:2
    },
    {
      name:"الكويت",
      value:1
    }
  ]

  subscriptionTypes:any=[
    {
      name:"6 شهور",
      value:1
    },
    {
      name:"12 شهر",
      value:2
    }
  ]
  addSubscriptionForm: FormGroup;
  subscriptionObj = new Subscriptions();
  submitted = false;
  subscriptionId: any;
  loading = false;
  subscriptionData: any;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService) { }

    
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'اضافة اشتراك',
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
            name: 'كل الاشتراكات',
            isLink: true,
            link: "/admin/Subscriptioncosts",
          },
                    {
                      name: 'اضافة اشتراك',
                      isLink: false,
                              }
        ]
      }
    };

    this.getTruckData()
    this.CreateSubscritonForm()
  }

  get SubscritonFormControls() {
    return this.addSubscriptionForm.controls;
  }

  
  resetMyTruckForm(){
    this.submitted=false;
    this.addSubscriptionForm.reset();

  }

  CreateSubscritonForm() {
    this.addSubscriptionForm = this.fb.group({
      subscriptName: [this.subscriptionObj.subscriptName, [Validators.required]],
      subscriptNameAr: [this.subscriptionObj.subscriptNameAr, [Validators.required]],
      country: [this.subscriptionObj.country, [Validators.required]],
      subscriptionType: [this.subscriptionObj.subscriptionType, [Validators.required]],
      status: [this.subscriptionObj.status]
    });

  }

  getTruckData() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.subscriptionId = this.route.snapshot.paramMap.get("id")!;
        this._httpService
          .get("/TruckData/GetTruckDataByIdForWeb", { TruckId: this.subscriptionId }, false)
          .subscribe((res: any) => {
            this.subscriptionData = res;
            this.contentHeader = {
              headerTitle: "تعديل اشتراك",
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
                    name: "الاشتراكات",
                    isLink: true,
                    link: "/admin/Subscriptioncosts",
                  },
                  {
                    name: "تعديل اشتراك",
                    isLink: false,
                  },
                ],
              },
            };

            this.addSubscriptionForm.patchValue(this.subscriptionData as Subscriptions);


          });
      }
    });
  }

  
  submitData() {
    this.submitted = true;

    console.log("form value: ", this.addSubscriptionForm.value);

    if (this.addSubscriptionForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.subscriptionObj, this.addSubscriptionForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .post("/TruckData/AddTruckData", this.subscriptionObj, false)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تمت اضافة الاشتراك", "تمت الاضافة!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
this.resetMyTruckForm()
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

  updateData() {
    this.submitted = true;

    console.log("form value: ", this.addSubscriptionForm.value);

    if (this.addSubscriptionForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.addSubscriptionForm, this.addSubscriptionForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .put(
        `/TruckData/UpdateTruckData/${this.subscriptionId}`,
        { Id: this.subscriptionId },
        this.subscriptionObj,
        false
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تمت تعديل الاشتراك بنجاح", "تم الاضافة!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            this.router.navigate(["/admin/Frequent-questions"]);
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

  deleteQuestion(id) {
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف الاشتراك?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "الغاء",
      confirmButtonText: "نعم احذف!",
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService
          .delete("/Frequent-questions", { Id: id })
          .subscribe((data: any) => {
            // console.log(data);
            if (data) {
              Swal.fire({
                icon: "success",
                title: "تم حذف الاشتراك !",
                text: "تم حذف الاشتراك بنجاح",
                confirmButtonText: "نعم",
                showConfirmButton: true,
                timer: 1500,
              }).then((result) => {
                this.router.navigate(["/admin/Subscriptioncosts"]);
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
