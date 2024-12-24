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
import { ValidationsService } from '@core/services/validations.service';

class UserModel {
  username:string='';
  userNameAr:string='';
  email:string='';
  cityName:string=''
  phoneNumber:string='';
  cityId:number
  truckId:number;
  creationDate:string;
  userType: number;
  userTypeId:number;
  password:string='';
  profileImage: string='';
  codeCountry: string='+966';
  phoneNumberConfirmed:boolean=true
}
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditUserComponent implements OnInit {
  validationAllControlls: string;

  imageFile = {
    isUpload: false,
    localUrl: "assets/images/upload/image-preview.jpg",
    id: "",
    progress: 0,
  };

  contentHeader: any;
  userobj = new UserModel();
  addUserForm: FormGroup;
  userId: any;
  submitted=false;
  loading=false;
  public countryCodeOptions = [
    {
      
      text: '+966',
      value: '+966'
    }
    // },
    // {
      
    //   text: '+995',
    //   value: '+995'
    // },
    // {
      
    //   text: '+20',
    //   value: '+20'
    // },
  ]
  userTypeOptions:any=[
    {
      text:"صاحب العربة المتنقلة",
      userTypeId:2
    },
    {
      text:"مستخدم",
      userTypeId:1
    },
    {
      text:"ادمن",
      userTypeId:3
    }
  ];

  fieldTextType: boolean = false;
  fieldTextconfirmPasswordType = false;
  flagInCrorrectPasswordAndC_password = false;
cityList:any
userData:any;

  constructor(private fb: FormBuilder,
    private _httpService: HttpService,
    private  toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute,
    private _ValidationsService: ValidationsService,
    private _coreTranslationService: CoreTranslationService) {
    this._coreTranslationService.translate(english, arabic);
  }

  ngOnInit(): void {
    this.CreateUserForm()
    this.getAllCities()
    this.getUserData()


    // this.form.removeControl('firstName');


    this.contentHeader = {
      headerTitle: 'اضافة مستخدم جديد',
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
            name: 'المستخدمين',
            isLink: true,
            link: '/admin/users'
          },
          {
            name: 'اضافة مستخدم جديد',
            isLink: false
          }
        ]
      }
    };
  }

  validationControlls() {
    this.validationAllControlls =
      this._ValidationsService.checkIfControlsInValid(
        this.addUserForm,
        "addUserForm.formValidation"
      );
  }

  get UserFormControls() {
    return this.addUserForm.controls;
  }

  passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/;
  passPattern =
  '^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]))).{8,32}$';
  CreateUserForm() {
    this.addUserForm = this.fb.group({
      username: [this.userobj.username, [Validators.required]],
      userNameAr: [this.userobj.userNameAr, [Validators.required]],
      email: [this.userobj.email, [Validators.required,Validators.email]],
      phoneNumber: [this.userobj.phoneNumber, [Validators.required,Validators.required,Validators.minLength(7),Validators.maxLength(7)]],
      password: [this.userobj.password,[Validators.required,Validators.pattern(this.passwordPattern)] ],
      cityId: [this.userobj.cityId,Validators.required],
      userTypeId: [this.userobj.userTypeId,Validators.required],
      profileImage: [this.userobj.profileImage,Validators.required],
      codeCountry: [this.userobj.codeCountry],
      phoneNumberConfirmed:[this.userobj.phoneNumberConfirmed]
    });

  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldConfirmTextType() {
    this.fieldTextconfirmPasswordType = !this.fieldTextconfirmPasswordType;
  }

  resetMyTruckForm() {
    this.submitted = false;
    this.addUserForm.reset();
    this.addUserForm.controls['userNameAr'].setValidators(null)
    this.addUserForm.controls['userNameAr'].updateValueAndValidity();
   this.imageFile.localUrl="assets/images/upload/image-preview.jpg";

  }

  ValidateconfirmPassword(cpassword: any) {
    if (this.addUserForm.value.password === cpassword) {
      this.flagInCrorrectPasswordAndC_password = false;
    } else {
      this.flagInCrorrectPasswordAndC_password = true;
    }
  }

  getUserData(){
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.userId = this.route.snapshot.paramMap.get('id');
       this.addUserForm.removeControl('password');

        this._httpService.get('/Users/GetUserById',{Id:this.userId},false).subscribe((res: any) => {
          // this.userData = res;
          console.log(res)
          this.contentHeader = {
            headerTitle: 'تعديل المستخدم',
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
                  name: 'كل المستخدمين',
                  isLink: true,
                  link: '/admin/users'
                },
                {
                  name: 'تعديل المستخدم',
                  isLink: false
                }
              ]
            }
          };

          
          this.addUserForm.patchValue(res as UserModel);

          this.addUserForm.get('phoneNumber').setValue(res.phoneNumber.split('+966')[1]||res.phoneNumber.split('0966')[1]);
         console.log('res.phoneNumber',res.phoneNumber.split('+966')[1]);
         
this.imageFile.localUrl=environment.urlApiFile+'/'+res.profileImage
// console.log("res.profileImage: ",res.profileImage)
this.addUserForm.controls.profileImage.setValue(res.profileImage);
// this.imageFile.commericalImage=this.truckData.commercialRegistrationImage
// this.AddTruckForm.controls.commercialRegistrationImage.setValue(res.commercialRegistrationImage);

        })
      }
    })
  
  }



  changephoneNumber(){
    let body={

      // "operationType": 0,
      "path": "/phoneNumberConfirmed",
      "op": "replace",
      "value": `${ this.addUserForm.controls['phoneNumberConfirmed'].value}`
      // "value":event.value
    
  }
    
        this._httpService.patch(`/Users/${this.userId}`,{},[body]).subscribe((res:any)=>{          
  
          
        })
      
  }






  removeImage(){
    this.imageFile.localUrl="assets/images/upload/image-preview.jpg";
    this.addUserForm.controls['profileImage'].setValue(null)
  }

  getAllCities(){
    this._httpService.get('/Users/GetAllCitiesForSingIn',{},false).subscribe((res: any) => {
      this.cityList = res

      console.log('cities: ',this.cityList)
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
                  this.addUserForm.controls.profileImage.setValue(
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

  saveUser(){
    this.submitted = true;
this.validationControlls()
    console.log("form value: ",this.addUserForm.value)

    if (this.addUserForm.invalid) {
      return;
    }

    
    this.loading = true;
    Object.assign(this.userobj, this.addUserForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);
    
    this._httpService.post('/Users/Register',this.userobj,false).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success(
          "تمت اضافة المستخدم بنجاح",
          "تمت الاضافة!",
          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
this.resetMyTruckForm()
        this.loading = false;
      }
    },((err=>{
      this.loading = false;
    })),()=>{
      this.loading = false;

    })




  }

  updateData(){
    this.submitted = true;

    console.log("form value: ",this.addUserForm.value)

    if (this.addUserForm.invalid) {
      return;
    }

    this.loading = true;
    Object.assign(this.userobj, this.addUserForm?.value);

    

    // console.log('this.addBankForm',this.settingsFrom.value);
    
    this._httpService.post(`/Users/UpdateUser?Id=${this.userId}`,this.userobj).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success(
          "تم تعديل المستخدم بنجاح",
          "تم التعديل!",
          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
        this.router.navigate(['/admin/users'])
        this.loading = false;
      }
    },((err=>{
      this.loading = false;
    })),()=>{
      this.loading = false;

    })    
  }

  deleteUser(id:any){
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف المستخدم?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:"الغاء" ,
      confirmButtonText: "نعم احذف!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.delete('/Users',{Id:id}).subscribe((data: any) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: "تم حذف المستخدم !" ,
              text: "تم حذف المستخدم بنجاح",
              confirmButtonText: "نعم",
              showConfirmButton: true,
              timer: 1500
            }).then((result)=>{
             
              this.router.navigate(['/admin/users'])

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
