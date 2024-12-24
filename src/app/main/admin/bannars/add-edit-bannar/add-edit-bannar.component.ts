import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Banners } from '../models/bannars';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { CoreTranslationService } from '@core/services/translation.service';
import { ValidationsService } from '@core/services/validations.service';
import { locale as arabic } from '../i18n/ar';
import { locale as english } from '../i18n/en';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-add-edit-bannar',
  templateUrl: './add-edit-bannar.component.html',
  styleUrls: ['./add-edit-bannar.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AddEditBannarComponent implements OnInit {

  contentHeader: any;
  addBannerForm: FormGroup;
  bannerObj = new Banners();
  submitted = false;
  bannerId: any;
  loading = false;
  bannerData: any;
  imageFile = {
    isUpload: false,
    localUrl: "assets/images/upload/image-preview.jpg",
    id: "",
    progress: 0,
  };
  validationAllControlls: string;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService,
    private _ValidationsService: ValidationsService,
    private _coreTranslationService:CoreTranslationService) {
      this._coreTranslationService.translate(english, arabic);
     }


  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'اضافة بنر',
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
            name: 'كل البنرات',
            isLink: true,
            link: '/admin/banners'
          },
          {
            name: 'اضافة بنر',
            isLink: false,
          }
        ]
      }
    };
    this.getTruckData()
    this.CreateBannerForm()
  }

  get BannerFormControls() {
    return this.addBannerForm.controls;
  }

  CreateBannerForm() {
    this.addBannerForm = this.fb.group({
      bannerTitle: [this.bannerObj.bannerTitle, [Validators.required]],
      bannerTitleAr: [this.bannerObj.bannerTitleAr, [Validators.required]],
      bannerDescription: [this.bannerObj.bannerDescription, [Validators.required]],
      bannerDescriptionAr: [this.bannerObj.bannerDescriptionAr, [Validators.required]],
      bannerImage: [this.bannerObj.bannerImage],
      // status:[this.bannerObj.status],
      // bannerLink:[this.bannerObj.bannerLink, [Validators.required]],
      // sequence: [this.bannerObj.sequence, [Validators.required]]
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
                  this.addBannerForm.controls.bannerImage.setValue(
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

  getTruckData() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.bannerId = this.route.snapshot.paramMap.get("id")!;
        this._httpService
          .get("/Banners/GetBannerById", { Id: this.bannerId }, false)
          .subscribe((res: any) => {
            this.bannerData = res;

            this.contentHeader = {
              headerTitle: "تعديل البنر",
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
                    name: "البنرات",
                    isLink: true,
                    link: "/admin/banners",
                  },
                  {
                    name: "تعديل البنر",
                    isLink: false,
                  },
                ],
              },
            };
            this.imageFile.localUrl =environment.urlApiFile+'/'+ res.bannerImage

            this.addBannerForm.patchValue(this.bannerData as Banners);


          });
      }
    });
  }

  resetMyTruckForm() {
    this.submitted = false;
    this.addBannerForm.reset();
    this.imageFile.localUrl = "assets/images/upload/image-preview.jpg";
    this.addBannerForm.controls['image'].setValue(null)
  }

  removeImage() {
    this.imageFile.localUrl = "assets/images/upload/image-preview.jpg";
    this.addBannerForm.controls['image'].setValue(null)
  }

  validationControlls() {
    this.validationAllControlls =
      this._ValidationsService.checkIfControlsInValid(
        this.addBannerForm,
        "addBannerForm.formValidation"
      );
  }

  submitData() {
    this.submitted = true;
    this.validationControlls();
    console.log("form value: ", this.addBannerForm.value);

    if (this.addBannerForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.bannerObj, this.addBannerForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .post("/Banners/AddBanner", this.bannerObj, false)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم اضافة البنر بنجاح", "تمت الاضافة!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            this.resetMyTruckForm();
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
  closeMessageErrors() {
    this.submitted = false;
  }

  updateData() {
    this.submitted = true;
    this.validationControlls();

    console.log("form value: ", this.addBannerForm.value);

    if (this.addBannerForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.bannerObj, this.addBannerForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .put(
        `/Banners/UpdateBanner/${this.bannerId}`,
        null,
        this.bannerObj,
        false
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم تعديل البنر بنجاح", "تم التعديل!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            this.router.navigate(["/admin/banners"]);
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

    console.log(
    )
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف البنر?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "الغاء",
      confirmButtonText: "نعم احذف!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.delete('/Banners', { Id: id }).subscribe((data: any) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: "تم حذف البنر !",
              text: "تم حذف البنر بنجاح",
              confirmButtonText: "نعم",
              showConfirmButton: true,
              timer: 1500
            }).then((result) => {

              this.router.navigate(["/admin/banners"]);

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
