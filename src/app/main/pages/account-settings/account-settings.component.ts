import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';

import { AccountSettingsService } from 'app/main/pages/account-settings/account-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/auth/service';
import { HttpService } from '@core/services/http.service';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CUsers, userPassword } from 'app/main/admin/user/models/users';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  // public
  public contentHeader: object;
  public data: any;
  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;
  public avatarImage: string;
  editUserForm:FormGroup;
  changePasswordForm:FormGroup
  userobj=new CUsers();
  imageFile = {
    isUpload: false,
    localUrl: "assets/images/upload/image-preview.jpg",
    id: "",
    progress: 0,
  };
  loading=false;
  submitted=false;
  // private
  private _unsubscribeAll: Subject<any>;
  currentUser:any;
  userData:CUsers;
  cityList:any
  userPasswordObj=new userPassword();

  countryCodeOptions = [
    {
      
      text: '+966',
      value: '+966'
    },
    {
      
      text: '+995',
      value: '+995'
    },
    {
      
      text: '+20',
      value: '+20'
    },
  ]
  /**
   * Constructor
   *
   * @param {AccountSettingsService} _accountSettingsService
   */
  constructor(private _accountSettingsService: AccountSettingsService,
    private fb:FormBuilder,
    private  toastr:ToastrService,
    private _authenticationService: AuthenticationService,
    private _httpService:HttpService,
    private router:Router
    ) {
    this._unsubscribeAll = new Subject();
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
// this.imageFile.localUrl=this.currentUser.
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Password Text Type Old
   */
  togglePasswordTextTypeOld() {
    this.passwordTextTypeOld = !this.passwordTextTypeOld;
  }

  /**
   * Toggle Password Text Type New
   */
  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  /**
   * Toggle Password Text Type Retype
   */
  togglePasswordTextTypeRetype() {
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
  }

  /**
   * Upload Image
   *
   * @param event
   */
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
                  this.editUserForm.controls.profileImage.setValue(
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

  getAllCities(){
    this._httpService.get('/Users/GetAllCitiesForSingIn',{},false).subscribe((res: any) => {
      this.cityList = res

      console.log('cities: ',this.cityList)
    });
  }

  removeImage(){
    this.imageFile.localUrl="assets/images/upload/image-preview.jpg";
    this.editUserForm.controls['profileImage'].setValue(null)
  }

  CreateUserForm() {
    this.editUserForm = this.fb.group({
      username: [this.userobj.username, [Validators.required]],
      userNameAr: [this.userobj.userNameAr, [Validators.required]],
      email: [this.userobj.email, [Validators.required,Validators.email]],
      phoneNumber: [this.userobj.phoneNumber, [Validators.required]],
      cityId: [this.userobj.cityId],
      userType: [this.userobj.userType],
      profileImage: [this.userobj.profileImage],
      codeCountry: [this.userobj.codeCountry]
    });

   
  }

  ChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: [this.userPasswordObj.oldPassword, [Validators.required]],
      password: [this.userPasswordObj.password, [Validators.required]],
      confirmPassword: [this.userPasswordObj.confirmPassword, [Validators.required]],
      userId: [this.currentUser.id],
 
  });
  }

  getUserData(){
    this._httpService.get('/Users/GetUserById',{Id:this.currentUser.id},false).subscribe((res: any) => {
      this.userData = res
     
      this.editUserForm.patchValue(this.userData as CUsers)

      console.log("this.userData: ",this.userData)
      this.editUserForm.controls.cityId.setValue(this.userData.cityId);

this.imageFile.localUrl=this.userData.profileImage
console.log("this.userData.profileImage: ",this.userData.profileImage)
this.editUserForm.controls.profileImage.setValue(this.userData.profileImage);
// this.imageFile.commericalImage=this.truckData.commercialRegistrationImage
// this.AddTruckForm.controls.commercialRegistrationImage.setValue(res.commercialRegistrationImage);

    })
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // this._accountSettingsService.onSettingsChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.data = response;
    //   this.avatarImage = this.data.accountSetting.general.avatar;
    // });

    this.CreateUserForm()
this.ChangePasswordForm()
    // this.editUserForm.patchValue(this.currentUser as Users)

    this.getUserData();

    this.getAllCities()

    // content header
    this.contentHeader = {
      headerTitle: 'اعدادات الحساب',
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
            name: 'اعدادات الحساب',
            isLink: false
          }
        ]
      }
    };
  }

  updatePassword(){
    this.submitted = true;

    console.log("form value: ",this.changePasswordForm.value)

    if (this.changePasswordForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.userPasswordObj, this.changePasswordForm?.value);

    

    // console.log('this.addBankForm',this.settingsFrom.value);
    
    this._httpService.post(`/Users/ChangePassword`,this.userPasswordObj,false).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success(
          "password edited succesfully",
          "Success!",
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

  updateUser(){
    this.submitted = true;

    console.log("form value: ",this.editUserForm.value)

    if (this.editUserForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.userobj, this.editUserForm?.value);

    

    // console.log('this.addBankForm',this.settingsFrom.value);
    
    this._httpService.put(`/Users/UpdateUser`,{Id:this.currentUser.id},this.userobj,false).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success(
          "user edited succesfully",
          "Success!",
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

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
