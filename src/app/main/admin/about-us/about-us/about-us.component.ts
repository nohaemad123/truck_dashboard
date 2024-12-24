import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { IAbout } from './models/about-us';
import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUsComponent implements OnInit {

  contentHeader: any;
  addAboutForm: any;
  submitted = false;
  loading = false;
  aboutData: any;
  currentLang: any;
  constructor(private fb: FormBuilder,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService,
    private _coreConfigService: CoreConfigService) {
    this.currentLang = this._coreConfigService.getConfigAppLanguage()
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "عن التطبيق",
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
            name: "عن التطبيق",
            isLink: false,
          },
        ],
      },
    };

    this.CreateAboutForm();

    this.getAboutUs();
  }

  get AboutFormControls() {
    return this.addAboutForm.controls;
  }

  CreateAboutForm() {
    this.addAboutForm = this.fb.group({

      name: ['', [Validators.required]],
      nameAr: ['', [Validators.required]]
    });

  }

  getAboutUs() {
    this._httpService.get("/AboutUs/GetAllAboutUs", { page: 1, CountItems: 10, language: this.currentLang }, false)
      .subscribe((res: any) => {
        this.aboutData = res;
        console.log(this.aboutData)

        this.addAboutForm.patchValue(this.aboutData as IAbout);
      })
  }

  resetAboutForm() {
    this.submitted = false;
    this.addAboutForm.reset();

  }

  submitData() {
    this.submitted = true;

    console.log("form value: ", this.addAboutForm.value);

    if (this.addAboutForm.invalid) {
      return;
    }

    this.loading = true;

    this._httpService
      .put(`/AboutUs/UpdateAboutUs/${this.aboutData.id}`, { Id: this.aboutData.id }, this.addAboutForm.value, false)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("تم تعديل عن التطبيق بنجاح", "تم التعديل!", {
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });

            this.resetAboutForm();
            this.getAboutUs()
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
