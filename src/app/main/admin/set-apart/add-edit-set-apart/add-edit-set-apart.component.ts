import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetAPart } from '../model/set-apart';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { ValidationsService } from '@core/services/validations.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { locale as arabic } from '../i18n/ar';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-add-edit-set-apart',
  templateUrl: './add-edit-set-apart.component.html',
  styleUrls: ['./add-edit-set-apart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditSetApartComponent implements OnInit {

  validationAllControlls: string;
  contentHeader: any;
  addBannerForm: FormGroup;
  bannerObj = new SetAPart();
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

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private _coreTranslationService:CoreTranslationService,
    private router: Router,
    private _ValidationsService: ValidationsService,
    private toastr: ToastrService) { 
      this._coreTranslationService.translate(arabic);
    }


  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "اضافة ميزة",
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
            name: "المميزات",
            isLink: true,
            link: "/admin/features",
          },
          {
            name: "اضافة ميزة",
            isLink: false,
          },
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
      title: [this.bannerObj.title, [Validators.required]],
      titleAr: [this.bannerObj.titleAr, [Validators.required]],
      icon: [this.bannerObj.icon,Validators.required],

    });

  }

  validationControlls() {
    this.validationAllControlls =
      this._ValidationsService.checkIfControlsInValid(
        this.addBannerForm,
        "addBannerForm.formValidation"
      );
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
                  this.addBannerForm.controls.icon.setValue(
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
          .get("/Features/GetFeatureById", { Id: this.bannerId }, false)
          .subscribe((res: any) => {
            this.bannerData = res;
            this.contentHeader = {
              headerTitle: "تعديل الميزة",
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
                    name: "المميزات",
                    isLink: true,
                    link: "/admin/features",
                  },
                  {
                    name: "تعديل الميزة",
                    isLink: false,
                  },
                ],
              },
            };

            this.addBannerForm.patchValue(this.bannerData as SetAPart);
            this.imageFile.localUrl = environment.urlApiFile+'/'+res.icon


          });
      }
    });
  }

  removeImage() {
    this.imageFile.localUrl = "assets/images/upload/image-preview.jpg";
    this.addBannerForm.controls['icon'].setValue(null)
  }

  resetMyTruckForm() {
    this.submitted = false;
    this.addBannerForm.reset();
    this.imageFile.localUrl = "assets/images/upload/image-preview.jpg";
    this.addBannerForm.controls['titleAr'].setValidators(null)
    this.addBannerForm.controls['titleAr'].updateValueAndValidity();

  }


  submitData() {
    this.submitted = true;
this.validationControlls()
    console.log("form value: ", this.addBannerForm.value);

    if (this.addBannerForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.bannerObj, this.addBannerForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .post("/Features/AddFeature", this.bannerObj, false)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم اضافة الميزة بنجاح", "تمت الاضافة!", {
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

  updateData() {
    this.submitted = true;

    console.log("form value: ", this.addBannerForm.value);

    if (this.addBannerForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.bannerObj, this.addBannerForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .put(
        `/Features/UpdateFeature/${this.bannerId}`,
        { Id: this.bannerId },
        this.bannerObj,
        false
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم تعديل الميزة بنجاح", "تم التعديل!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            this.router.navigate(["/admin/features"]);
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
      title: "هل انت متأكد انك تريد حذف الميزة?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:"الغاء" ,
      confirmButtonText: "نعم احذف!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.delete('/Features',{Id:id}).subscribe((data: any) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: "تم حذف الميزة !" ,
              text: "تم حذف الميزة بنجاح",
              confirmButtonText: "نعم",
              showConfirmButton: true,
              timer: 1500
            }).then((result)=>{
             
              this.router.navigate(["/admin/features"]);

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
