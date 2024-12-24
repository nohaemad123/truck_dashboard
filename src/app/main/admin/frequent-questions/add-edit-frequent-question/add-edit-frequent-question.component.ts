import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FrequentQuestion } from "../models/frequent-questions";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "@core/services/http.service";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { ValidationsService } from "@core/services/validations.service";

import { locale as arabic } from "../i18n/ar";
import { locale as english } from "../i18n/en";
import { CoreTranslationService } from "@core/services/translation.service";
@Component({
  selector: "app-add-edit-frequent-question",
  templateUrl: "./add-edit-frequent-question.component.html",
  styleUrls: ["./add-edit-frequent-question.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditFrequentQuestionComponent implements OnInit {
  contentHeader: any;
  addQuestionForm: FormGroup;
  questionObj = new FrequentQuestion();
  submitted = false;
  questionId: any;
  loading = false;
  questionData: any;
  validationAllControlls: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService,
    private _ValidationsService: ValidationsService,
    private _coreTranslationService: CoreTranslationService
  ) {
    this._coreTranslationService.translate(english, arabic);
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "اضافة سؤال",
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
            name: "كل الاسئلة",
            isLink: true,
            link: "/admin/Frequent-questions",
          },
          {
            name: "اضافة سؤال",
            isLink: false,
          },
        ],
      },
    };
    this.getTruckData();
    this.CreateQuestionForm();
  }

  get QuestionFormControls() {
    return this.addQuestionForm.controls;
  }

  CreateQuestionForm() {
    this.addQuestionForm = this.fb.group({
      question: [this.questionObj.question, [Validators.required]],
      questionAr: [this.questionObj.questionAr, [Validators.required]],
      answer: [this.questionObj.answer, [Validators.required]],
      answerAr: [this.questionObj.answerAr, [Validators.required]],
      sort: [this.questionObj.sort, [Validators.required]],
    });
  }

  resetMyTruckForm() {
    this.submitted = false;
    this.addQuestionForm.reset();
    this.addQuestionForm.controls['questionAr'].setValidators(null);
    this.addQuestionForm.controls['questionAr'].updateValueAndValidity();
    this.addQuestionForm.controls['answerAr'].setValidators(null)
    this.addQuestionForm.controls['answerAr'].updateValueAndValidity();
  }

  closeMessageErrors() {
    this.submitted = false;
  }

  getTruckData() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.questionId = this.route.snapshot.paramMap.get("id")!;
        this._httpService
          .get("/Fqas/GetFqaById", { Id: this.questionId }, false)
          .subscribe((res: any) => {
            this.questionData = res;
            this.contentHeader = {
              headerTitle: "تعديل السؤال",
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
                    name: "الاسئلة",
                    isLink: true,
                    link: "/admin/Frequent-questions",
                  },
                  {
                    name: "تعديل السؤال",
                    isLink: false,
                  },
                ],
              },
            };

            this.addQuestionForm.patchValue(
              this.questionData as FrequentQuestion
            );
          });
      }
    });
  }

  submitData() {
    this.submitted = true;
    this.validationControlls();
    if (this.addQuestionForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.questionObj, this.addQuestionForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService.post("/Fqas/AddFqa", this.questionObj, false).subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          this.toastr.success("تمت اضافة السؤال بنجاح", "تمت الاضافة!", {
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

  validationControlls() {
    this.validationAllControlls =
      this._ValidationsService.checkIfControlsInValid(
        this.addQuestionForm,
        "addQuestionForm.formValidation"
      );
  }

  updateData() {
    this.submitted = true;

    console.log("form value: ", this.addQuestionForm.value);
    this.validationControlls();
    if (this.addQuestionForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.questionObj, this.addQuestionForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService
      .put(
        `/Fqas/UpdateFqa/${this.questionId}`,
        { Id: this.questionId },
        this.questionObj,
        false
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تمت تعديل السؤال بنجاح", "تم التعديل!", {
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
    console.log();
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
        this._httpService.delete("/Fqas", { Id: id }).subscribe((data: any) => {
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
