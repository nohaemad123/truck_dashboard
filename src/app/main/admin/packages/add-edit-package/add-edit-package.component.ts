import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Packages, featuresAr } from '../model/package';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';

@Component({
  selector: 'app-add-edit-package',
  templateUrl: './add-edit-package.component.html',
  styleUrls: ['./add-edit-package.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [repeaterAnimation]
})
export class AddEditPackageComponent implements OnInit {

  contentHeader: any;
  addQuestionForm: FormGroup;
  questionObj = new Packages();
  submitted = false;
  questionId: any;
  loading = false;
  questionData: any;



  public features = [{ Description: '' }];
  public featuresAr = [{ DescriptionAr: '' }];


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'اضافة باقة',
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
            name: 'كل الباقات',
            isLink: true,
            link: '/admin/Packages'
          },
          {
            name: 'اضافة باقة',
            isLink: false,
          }
        ]
      }
    };
    this.getTruckData()
    this.CreateQuestionForm()
  }

  get QuestionFormControls() {
    return this.addQuestionForm.controls;
  }

  CreateQuestionForm() {
    this.addQuestionForm = this.fb.group({
      packageTitle: [this.questionObj.packageTitle, [Validators.required]],
      packageTitleAr: [this.questionObj.packageTitleAr, [Validators.required]],
      packageDescription: [this.questionObj.packageDescription, [Validators.required]],
      packageDescriptionAr: [this.questionObj.packageDescriptionAr, [Validators.required]],
      best_value: [this.questionObj.best_value],
      status: [this.questionObj.status],
      features: [this.questionObj.features, [Validators.required]],
      featuresAr: [this.questionObj.featuresAr, [Validators.required]]

    });

  }

  addfeature() {
    this.features.push({
      Description: ''
    });
  }

  deleteFeature(id) {
    for (let i = 0; i < this.features.length; i++) {
      if (this.features.indexOf(this.features[i]) === id) {
        this.features.splice(i, 1);
        break;
      }
    }
  }

  addfeatureAr() {
    this.featuresAr.push({
      DescriptionAr: ''
    });
  }

  deleteFeatureAr(id) {
    for (let i = 0; i < this.featuresAr.length; i++) {
      if (this.featuresAr.indexOf(this.featuresAr[i]) === id) {
        this.featuresAr.splice(i, 1);
        break;
      }
    }
  }

  getTruckData() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.questionId = this.route.snapshot.paramMap.get("id")!;
        this._httpService
          .get("/TruckData/GetTruckDataByIdForWeb", { TruckId: this.questionId }, false)
          .subscribe((res: any) => {
            this.questionData = res;
            this.contentHeader = {
              headerTitle: "تعديل باقة",
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
                    name: "الباقات",
                    isLink: true,
                    link: "/admin/Packages",
                  },
                  {
                    name: "تعديل الباقة",
                    isLink: false,
                  },
                ],
              },
            };

            this.addQuestionForm.patchValue(this.questionData as Packages);


          });
      }
    });
  }

  resetMyTruckForm() {
    this.submitted = false;
    this.addQuestionForm.reset();

  }

  submitData() {
    this.submitted = true;

    console.log("form value: ", this.addQuestionForm.value);

    if (this.addQuestionForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.questionObj, this.addQuestionForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .post("/TruckData/AddTruckData", this.questionObj, false)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم اضافة الباقة بنجاح", "تمت الاضافة!", {
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

    console.log("form value: ", this.addQuestionForm.value);

    if (this.addQuestionForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.questionObj, this.addQuestionForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .put(
        `/TruckData/UpdateTruckData/${this.questionId}`,
        { Id: this.questionId },
        this.questionObj,
        false
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم تعديل الباقة بنجاح", "تم التعديل!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            this.router.navigate(["/admin/Packages"]);
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
      title: "هل انت متأكد انك تريد حذف الباقة?",
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
                title: "تم حذف الباقة !",
                text: "تم حذف الباقة بنجاح",
                confirmButtonText: "نعم",
                showConfirmButton: true,
                timer: 1500,
              }).then((result) => {
                this.router.navigate(["/admin/Frequent-questions"]);
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
