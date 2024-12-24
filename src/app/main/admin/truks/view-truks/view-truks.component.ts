import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { TrucksItmes } from '../models/truks';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-view-truks',
  templateUrl: './view-truks.component.html',
  styleUrls: ['./view-truks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewTruksComponent implements OnInit {

  contentHeader: any;
  truckId:any;
  TruckData:any;
  AddTruckForm:FormGroup;
  usersData:any
citiesData:any
banksData:any
buisnessData:any
  truckobj = new TrucksItmes();

  imageFile = {
    isUpload: false,
    truckImage: "assets/images/upload/image-preview.jpg",
    commericalImage: "assets/images/upload/image-preview.jpg",
    id: "",
    progress: 0,
  };
  rating:any=0;
  constructor(private route:ActivatedRoute,
    private _httpService:HttpService,
    private fb:FormBuilder) { }


  ngOnInit(): void {
    this.getTruckData()

   
    this.route.queryParamMap
    .subscribe((params:any) => {
     
       let obj:any={...params}
        this.rating=obj.params.rating;
     
    
    }
  );

    this.contentHeader = {
      headerTitle: 'تفاصيل العربة المتنقلة',
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
            name: 'العربات المتنقة',
            isLink: true,
            link: '/admin/Trucks'
          },
          {
            name: 'تفاصيل العربة المتنقلة',
            isLink: false
          }
        ]
      }
    };

    this.CreateTruckForm()

    this.getAllData()

    for (var control in this.AddTruckForm.controls) {
      this.AddTruckForm.controls[control].disable();
    }
  }

  getTruckData(){
    this.truckId = this.route.snapshot.paramMap.get('id')!;
    this._httpService.get('/TruckData/GetTruckDataByIdForWeb',{TruckId:this.truckId},false).subscribe((res: any) => {
      this.TruckData = res
      // this.TruckData.rating=4;
      // console.log('truck: ',this.TruckData)

      this.AddTruckForm.patchValue(this.TruckData as TrucksItmes)
      this.imageFile.truckImage=environment.urlApiFile+this.TruckData.truckImage
      this.AddTruckForm.controls.truckImage.setValue(res.truckImage);
      this.imageFile.commericalImage=environment.urlApiFile+this.TruckData.commercialRegistrationImage
      this.AddTruckForm.controls.commercialRegistrationImage.setValue(res.commercialRegistrationImage);
    })

  }

  CreateTruckForm() {
    this.AddTruckForm = this.fb.group({
      truckName:[this.truckobj.truckName,Validators.required],
      isApproved:[this.truckobj.isApproved],
      truckNameAr:[this.truckobj.truckNameAr,Validators.required],
      description:[this.truckobj.description,Validators.required],
      descriptionAr:[this.truckobj.descriptionAr,Validators.required],
      address:[this.truckobj.address,Validators.required],
      addressAr:[this.truckobj.addressAr,Validators.required],
      deliveryPriceInsideCity:[this.truckobj.deliveryPriceInsideCity,Validators.required],
      deliveryPriceOutInsideCity:[this.truckobj.deliveryPriceOutInsideCity,Validators.required],
      lon:[this.truckobj.lon,Validators.required],
      lat:[this.truckobj.lat,Validators.required],
      userId:[this.truckobj.userId,Validators.required],
      cityId:[this.truckobj.cityId,Validators.required],
      businessTypeId:[this.truckobj.businessTypeId,Validators.required],
      bankId:[this.truckobj.bankId,Validators.required],
      bankAccountNumber:[this.truckobj.bankAccountNumber,Validators.required],
      truckImage:[this.truckobj.truckImage],
      commercialRegistrationImage:[this.truckobj.commercialRegistrationImage],
      isOnline:[this.truckobj.isOnline]
    });

  }

  getAllData(){
    this._httpService.get('/Users/GetAllUsers',{CountItems:20,page:1},false).subscribe((res: any) => {
      this.usersData = res.items
    });

    this._httpService.get('/Cities/GetAllCities',{CountItems:20,page:1},false).subscribe((res: any) => {
      this.citiesData = res.items
    });

    this._httpService.get('/Banks/GetAllBanks',{CountItems:20,page:1},false).subscribe((res: any) => {
      this.banksData = res.items
    });

    this._httpService.get('/BusinessTypes/GetAllBusinessTypes',{CountItems:20,page:1},false).subscribe((res: any) => {
      this.buisnessData = res.items
    });
  }
}
