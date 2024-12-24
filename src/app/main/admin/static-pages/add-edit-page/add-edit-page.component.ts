import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaticPage } from '../models/static-pages';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-page',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditPageComponent implements OnInit {


  contentHeader: any;
  addBannerForm: FormGroup;
  bannerObj = new StaticPage();
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
    private router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'اضافة صفحة',
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
            name: 'كل الصفحات',
            isLink: true,
            link: "/admin/Pages",
          },
          {
            name: 'اضافة صفحة',
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
      pageTitle: [this.bannerObj.pageTitle, [Validators.required]],
      pageTitleAr: [this.bannerObj.pageTitleAr, [Validators.required]],
      pageDescription: [this.bannerObj.pageDescription, [Validators.required]],
      pageDescriptionAr: [this.bannerObj.pageDescriptionAr, [Validators.required]],
      pageContent: [this.bannerObj.pageContent, [Validators.required]],
      pageContentAr: [this.bannerObj.pageContentAr, [Validators.required]],
      image:[this.bannerObj.image],
      status:[this.bannerObj.status],
   
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
                  this.addBannerForm.controls.profileImage.setValue(
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
          .get("/TruckData/GetTruckDataByIdForWeb", { TruckId: this.bannerId }, false)
          .subscribe((res: any) => {
            this.bannerData = res;
            this.contentHeader = {
              headerTitle: "تعديل الصفحة",
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
                    name: "الصفحات",
                    isLink: true,
                    link: "/admin/Pages",
                  },
                  {
                    name: "تعديل الصفحة",
                    isLink: false,
                  },
                ],
              },
            };

            this.addBannerForm.patchValue(this.bannerData as StaticPage);


          });
      }
    });
  }

  removeImage(){
    this.imageFile.localUrl="assets/images/upload/image-preview.jpg";
    this.addBannerForm.controls['image'].setValue(null)
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
    Object.assign(this.bannerObj, this.addBannerForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .post("/TruckData/AddTruckData", this.bannerObj, false)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم اضافة الصفحة بنجاح", "تمت الاضافة!", {
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
        `/TruckData/UpdateTruckData/${this.bannerId}`,
        { Id: this.bannerId },
        this.bannerObj,
        false
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم تعديل الصفحة بنجاح", "تم التعديل!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            this.router.navigate(["/admin/Pages"]);
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
      title: "هل انت متأكد انك تريد حذف السؤال?",
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
                title: "تم حذف السؤال !",
                text: "تم حذف السؤال بنجاح",
                confirmButtonText: "نعم",
                showConfirmButton: true,
                timer: 1500,
              }).then((result) => {
                this.router.navigate(["/admin/Pages"]);
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
