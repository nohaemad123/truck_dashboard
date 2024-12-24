import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HowJoin } from '../models/how-join';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-how-join',
  templateUrl: './add-how-join.component.html',
  styleUrls: ['./add-how-join.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddHowJoinComponent implements OnInit {



  contentHeader: any;
  addBannerForm: FormGroup;
 
  submitted = false;
  bannerId: any;
  loading = false;
  bannerData: any;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {

    this.getTruckData()
    this.CreateBannerForm()
  }

  get BannerFormControls() {
    return this.addBannerForm.controls;
  }

  CreateBannerForm() {
    this.addBannerForm = this.fb.group({
      // title: [this.bannerObj.title, [Validators.required]],
      // titleAr: [this.bannerObj.titleAr, [Validators.required]],
      description: ['', [Validators.required]],
      descriptionAr: ['', [Validators.required]],
      userType: [this.bannerId]
      // image:[this.bannerObj.image]   
    });

  }


  getTruckData() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.bannerId = Number(this.route.snapshot.paramMap.get("id")!);
        console.log("banner id: ", this.bannerId)
        if (this.bannerId === 1) {
          this.contentHeader = {
            headerTitle: "كيف تنضم كعميل",
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
                  name: "كيف تنضم كعميل",
                  isLink: false,
                },
              ],
            },
          };
        } else {
          this.contentHeader = {
            headerTitle: "كيف تنضم كصاحب عربة",
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
                  name: "كيف تنضم كصاحب عربة",
                  isLink: false,
                },
              ],
            },
          };
        }
        this._httpService
          .get("/Joins/GetAllJoins", { UserType: this.bannerId }, false)
          .subscribe((res: any) => {
            this.bannerData = res;


            this.addBannerForm.patchValue(this.bannerData as HowJoin);


          });
      }
    });
  }


  resetMyTruckForm() {
    this.submitted = false;
    this.addBannerForm.reset();

  }


  submitData() {
    this.submitted = true;

    console.log("form value: ", this.addBannerForm.value);

    if (this.addBannerForm.invalid) {
      return;
    }

    this.loading = true;

    this._httpService
      .put(`/Joins/UpdateJoin/${this.bannerId}`, { Id: this.bannerId }, this.addBannerForm.value, false)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            if (this.bannerId === 1) {
              this.toastr.success("تم تعديل كيف تنضم كعميل بنجاح", "تم التعديل!", {
                toastClass: "toast ngx-toastr",
                closeButton: true,
              });
            } else {
              this.toastr.success("تم تعديل كيف تنضم كصاحب عربة بنجاح", "تم التعديل!", {
                toastClass: "toast ngx-toastr",
                closeButton: true,
              });
            }

            this.resetMyTruckForm();
            this.getTruckData()
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

  



}
