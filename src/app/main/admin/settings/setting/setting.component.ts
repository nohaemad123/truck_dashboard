
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { map } from 'rxjs/operators';
import { environment } from "environments/environment";
import { locale as arabic } from 'app/main/admin/user/i18n/ar';
import { locale as english } from 'app/main/admin/user/i18n/en';
import { CoreTranslationService } from '@core/services/translation.service';
import { ToastService } from 'app/main/components/toasts/toasts.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Settings } from '../models/settings';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SettingComponent implements OnInit {


  contentHeader: any;
  settingObj = new Settings();
  settingForm: FormGroup;
  submitted = false;
  loading = false;  
  id:any;


  constructor(private fb: FormBuilder,
    private _httpService: HttpService,
    private toastr: ToastrService,
    private router: Router,
    private _coreTranslationService: CoreTranslationService) {
    this._coreTranslationService.translate(english, arabic);
  }

  ngOnInit(): void {
    this.CreateUserForm()
this.GetAllSettings()


    // this.form.removeControl('firstName');


    this.contentHeader = {
      headerTitle: 'كافه الإعدادات',
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
            name: 'الإعدادات',
            isLink: false
          }
        ]
      }
    };
  }

  get SettingsFormControls() {
    return this.settingForm.controls;
  }

  CreateUserForm() {
    this.settingForm = this.fb.group({
      siteDescription: [this.settingObj.siteDescription],
      siteTitle: [this.settingObj.siteTitle],
      email: [this.settingObj.email, [Validators.email]],
      phoneNumber: [this.settingObj.phoneNumber],
      whatsAppNumber: [this.settingObj.whatsAppNumber],
      linkAndroidStore: [this.settingObj.linkAndroidStore],
      linkAppleStore: [this.settingObj.linkAppleStore],
      facebookLink: [this.settingObj.facebookLink],
      twitterLink: [this.settingObj.twitterLink],
      instagramLink: [this.settingObj.instagramLink],
      snapchatLink: [this.settingObj.snapchatLink],
      siteDescriptionAr: [this.settingObj.siteDescriptionAr],
      siteTitleAr: [this.settingObj.siteTitleAr]
    });

  }


  GetAllSettings(){
    this._httpService.get('/Settings/GetSettingById',{Id:1},false).subscribe((data: any) => {
      console.log(data)
      if (data) {
        this.id=data.id;
        this.settingForm.patchValue(data as Settings);

      }else{
        this.id=0;
      }
    })

  }


  saveSetting() {
    this.submitted = true;

    console.log("form value: ", this.settingForm.value)

    if (this.settingForm.invalid) {
      return;
    }


    this.loading = true;
    Object.assign(this.settingObj, this.settingForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService.post('/Settings/AddSetting', this.settingObj, false).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success(
          "تم اضافة الاعدادات بنجاح",
          "تمت الاضافة",
          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
        this.router.navigate(['/admin/Trucks'])
        this.loading = false;
      }
    }, ((err => {
      this.loading = false;
    })), () => {
      this.loading = false;

    })




  }

  updateSetting() {
    this.submitted = true;

    console.log("form value: ", this.settingForm.value)

    if (this.settingForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.settingObj, this.settingForm?.value);



    // console.log('this.addBankForm',this.settingsFrom.value);

    this._httpService.put(`/Settings/UpdateSetting/${this.id}`,{Id:this.id}, this.settingObj).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success(
          "تم تعديل الاعدادات بنجاح",
          "تم التعديل!",
          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
        this.router.navigate(['/admin/Trucks'])
        this.loading = false;
      }
    },((err=>{
      this.loading = false;
    })),()=>{
      this.loading = false;

    })    
  }


}
