import { HttpEventType } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "@core/services/http.service";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { TrucksItmes } from "../models/truks";
import { ValidationsService } from "@core/services/validations.service";
import { CoreTranslationService } from "@core/services/translation.service";
import { locale as arabic } from '../i18n/ar';
import { locale as english } from '../i18n/en';
import { environment } from "environments/environment";

@Component({
  selector: "app-add-edit-truks",
  templateUrl: "./add-edit-truks.component.html",
  styleUrls: ["./add-edit-truks.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditTruksComponent implements OnInit {
  contentHeader: any;
  AddTruckForm: FormGroup;

  truckobj = new TrucksItmes();
  submitted = false;

  imageFile = {
    isUpload: false,
    truckImage: "assets/images/upload/image-preview.jpg",
    commericalImage: "assets/images/upload/image-preview.jpg",
    id: "",
    progress: 0,
  };

  public fileName = undefined;
  fileSize = " 0 KB";
  usersData: any;
  citiesData: any;
  banksData: any;
  buisnessData: any;
  loading = false;
  truckId: any;
  truckData: any;
  validationAllControlls: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService,
    private _ValidationsService: ValidationsService,
    private _coreTranslationService:CoreTranslationService
  ) {
    this._coreTranslationService.translate(english, arabic);


  }

  ngOnInit(): void {
    this.CreateTruckForm();

    this.contentHeader = {
      headerTitle: "اضافة العربة المتنقلة",
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
            name: "العربات المتنقة",
            isLink: true,
            link: "/admin/Trucks",
          },
          {
            name: "اضافة العربة المتنقلة",
            isLink: false,
          },
        ],
      },
    };

    this.getAllData();
    this.getTruckData();
  }

  getTruckData() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.truckId = this.route.snapshot.paramMap.get("id")!;
        this._httpService
          .get(
            "/TruckData/GetTruckDataByIdForWeb",
            { TruckId: this.truckId },
            false
          )
          .subscribe((res: any) => {
            this.truckData = res;
            this.contentHeader = {
              headerTitle: "تعديل العربة المتنقلة",
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
                    name: "العربات المتنقة",
                    isLink: true,
                    link: "/admin/Trucks",
                  },
                  {
                    name: "تعديل العربة المتنقلة",
                    isLink: false,
                  },
                ],
              },
            };

            this.AddTruckForm.patchValue(this.truckData as TrucksItmes);

            this.imageFile.truckImage = environment.urlApiFile+ this.truckData.truckImage;
            this.AddTruckForm.controls.truckImage.setValue(res.truckImage);
            this.imageFile.commericalImage =
            environment.urlApiFile+this.truckData.commercialRegistrationImage;
            this.AddTruckForm.controls.commercialRegistrationImage.setValue(
              res.commercialRegistrationImage
            );
          });
      }
    });
  }
  get TruckFormControls() {
    return this.AddTruckForm.controls;
  }

  CreateTruckForm() {
    this.AddTruckForm = this.fb.group({
      isOnline: [this.truckobj.isOnline],
      isApproved: [this.truckobj.isApproved],
      truckName: [this.truckobj.truckName, Validators.required],
      truckNameAr: [this.truckobj.truckNameAr, Validators.required],
      description: [this.truckobj.description, Validators.required],
      descriptionAr: [this.truckobj.descriptionAr, Validators.required],
      address: [this.truckobj.address, Validators.required],
      addressAr: [this.truckobj.addressAr, Validators.required],
      deliveryPriceInsideCity: [
        this.truckobj.deliveryPriceInsideCity,
        Validators.required,
      ],
      deliveryPriceOutInsideCity: [
        this.truckobj.deliveryPriceOutInsideCity,
        Validators.required,
      ],
      lon: [this.truckobj.lon, Validators.required],
      lat: [this.truckobj.lat, Validators.required],
      userId: [this.truckobj.userId, Validators.required],
      cityId: [this.truckobj.cityId, Validators.required],
      businessTypeId: [this.truckobj.businessTypeId, Validators.required],
      bankId: [this.truckobj.bankId, Validators.required],
      bankAccountNumber: [this.truckobj.bankAccountNumber, Validators.required],
      truckImage: [this.truckobj.truckImage],
      commercialRegistrationImage: [this.truckobj.commercialRegistrationImage],
    });
  }

  validationControlls() {
    this.validationAllControlls =
      this._ValidationsService.checkIfControlsInValid(
        this.AddTruckForm,
        "AddTruckForm.formValidation"
      );
  }

  getAllData() {
    this._httpService
      .get("/Users/GetAllUsers", { CountItems: 1000, page: 1 }, false)
      .subscribe((res: any) => {
        this.usersData = res.items;
      });

    this._httpService
      .get("/Cities/GetAllCities", { CountItems: 20, page: 1 }, false)
      .subscribe((res: any) => {
        this.citiesData = res.items;
      });

    this._httpService
      .get("/Banks/GetAllBanks", { CountItems: 20, page: 1 }, false)
      .subscribe((res: any) => {
        this.banksData = res.items;
      });

    this._httpService
      .get(
        "/BusinessTypes/GetAllBusinessTypes",
        { CountItems: 20, page: 1 },
        false
      )
      .subscribe((res: any) => {
        this.buisnessData = res.items;
      });
  }

  showPreviewFile(event: any, type = "truckImage") {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        if (type == "truckImage") {
          this.imageFile.truckImage = event.target.result;
          console.log("event.target.result;", event.target.result);
        } else {
          this.fileName = file.name;
          var size = file.size;
          this.fileSize = Math.round(size / 1024) + " KB";
          this.imageFile.commericalImage = event.target.result;
        }
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
            } else if (event.type == HttpEventType.Response) {
              if (event.body) {
                if (event.body.data) {
                  this.imageFile.isUpload = true;
                  if (type == "truckImage") {
                    this.AddTruckForm.controls.truckImage.setValue(
                      event.body.data
                    );
                  } else {
                    this.fileName = this.imageFile.commericalImage;
                    this.AddTruckForm.controls.commercialRegistrationImage.setValue(
                      event.body.data
                    );
                  }
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

  resetMyTruckForm() {
    this.submitted = false;
    this.AddTruckForm.reset();
    this.imageFile.commericalImage="assets/images/upload/image-preview.jpg"
    this.imageFile.truckImage="assets/images/upload/image-preview.jpg"
    this.AddTruckForm.controls['truckNameAr'].setValidators(null)
    this.AddTruckForm.controls['truckNameAr'].updateValueAndValidity();
    this.AddTruckForm.controls['descriptionAr'].setValidators(null)
    this.AddTruckForm.controls['descriptionAr'].updateValueAndValidity();
    this.AddTruckForm.controls['addressAr'].setValidators(null)
    this.AddTruckForm.controls['addressAr'].updateValueAndValidity();


    

  }

  closeMessageErrors() {
    this.submitted = false;
  }

  submitData() {
    this.submitted = true;

    // console.log("form value: ", this.AddTruckForm.value);
    this.validationControlls();
    if (this.AddTruckForm.invalid) {
      return;
    }



    this.loading = true;
    Object.assign(this.truckobj, this.AddTruckForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .post("/TruckData/AddTruckData", this.truckobj, false)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم اضافة العربة بنجاح", "تم الاضافة!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            // this.router.navigate(["/admin/Trucks/Edit/" + res.id]);
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
    this.validationControlls();
    console.log("form value: ", this.AddTruckForm.value);

    if (this.AddTruckForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.truckobj, this.AddTruckForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .put(
        `/TruckData/UpdateTruckData/${this.truckId}`,
        { Id: this.truckId },
        this.truckobj,
        false
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم تعديل العربة بنجاح", "تم التعديل!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            this.router.navigate(["/admin/Trucks"]);
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

  deleteTruck(id) {
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
                this.router.navigate(["/admin/Trucks"]);
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
