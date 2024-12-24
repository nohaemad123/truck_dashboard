import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { PrivacyPoliciesModel } from '../models/privacypolicies';

@Component({
  selector: 'app-add-edit-privacypolicies',
  templateUrl: './add-edit-privacypolicies.component.html',
  styleUrls: ['./add-edit-privacypolicies.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PrivacyPoliciesComponent implements OnInit {



  contentHeader: any;
  PrivacyPolicyForm: FormGroup;
 
  submitted = false;
  bannerId: any;
  loading = false;
  PrivacyPolicies: any;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {

    this.GetPrivacyPolicyById()
    this.CreateBannerForm()
  }

  get BannerFormControls() {
    return this.PrivacyPolicyForm.controls;
  }

  CreateBannerForm() {
    this.PrivacyPolicyForm = this.fb.group({
      privacyPolicyEn: ['', [Validators.required]],
      privacyPolicyAr: ['', [Validators.required]],
      id:[0]
      
    });

  }


  GetPrivacyPolicyById() {
    this.contentHeader = {
      headerTitle: "سياسه الخصوصيه",
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
            name: "سياسه الخصوصيه",
            isLink: false,
          },
        ],
      },
    };
    this._httpService
    .get("/PrivacyPolicies/GetPrivacyPolicyById", { Id:1 }, false)
    .subscribe((res: any) => {
      this.PrivacyPolicies=res;
      this.PrivacyPolicyForm.patchValue(this.PrivacyPolicies);


    });
  }


  resetMyPrivacyPolicyForm() {
    this.submitted = false;
    this.PrivacyPolicyForm.reset();

  }


  submitData() {
    this.submitted = true;

    console.log("form value: ", this.PrivacyPolicyForm.value);

    if (this.PrivacyPolicyForm.invalid) {
      return;
    }

    this.loading = true;

    this._httpService
      .put(`/PrivacyPolicies/UpdatePrivacyPolicy/${this.PrivacyPolicies.id}`, { Id: this.PrivacyPolicies.id }, this.PrivacyPolicyForm.value, false)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
           
              this.toastr.success("تم تعديل سياسه الخصوصيه بنجاح", "تم التعديل!", {
                toastClass: "toast ngx-toastr",
                closeButton: true,
              });
            

            this.resetMyPrivacyPolicyForm();
            this.GetPrivacyPolicyById()
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
