import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListOfValuesService } from '@core/services/list-of-values.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { locale as arabic } from 'app/main/admin/products/i18n/ar';
import { locale as english } from 'app/main/admin/products/i18n/en';
import { environment } from 'environments/environment';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Products } from '../products.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [repeaterAnimation]

})
export class ProductAddComponent implements OnInit {

  categoryList: any = [];
  brandList: any = [];
  tagList: any = [];


  public urlApiFile = environment.urlApiFile;

  status: any = [
    { name: "Published", value: 0 },
    { name: "Inactive", value: 1 },
    // { name: "Draft", value: 2 },
    { name: "Scheduled", value: 2 }
  ]

  productImages: any = [

  ];

  productSubCategory: any = [];


  statusValue: any = 1;
  Scheduled = false;
  subCategoryValue: any;
  brandValue: any;
  publishDate: any;

  product_template: any = [
    { name: "Default template", value: "default" }
  ]

  taxClass: any = [
  ]
  scheduled = false;


  variation: any = [
    { name: "Color", value: "color" },
    { name: "Size", value: "size" },
    { name: "Material", value: "material" },
    { name: "Style", value: "style" }


  ]

  public items = [{ variation_type: '', variation: '' }];

  subCategory_items: any = [];
  imageFile: any;
  public submitted = false;
  public loading = false
  isPhysical = true
  isPercentage = false
  public dateTimeOptions: FlatpickrOptions = {
    altInput: true,
    enableTime: true
  };

  addEditProductForm: any;
  successRemoveImg: boolean = false;
  discountPercentage: any = 10;
  id: any;
  addProductObj: Products = new Products()
  productData: any;
  contentHeader: object
  subCategoryName: any;
  /**
    * Constructor
    *
    * @param {CoreTranslationService} _coreTranslationService

    */
  constructor(
    private productsService: ProductsService,
    private _coreTranslationService: CoreTranslationService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private listService: ListOfValuesService) {
    this._coreTranslationService.translate(english, arabic);
    this.imageFile = {
      isUpload: false,
      localUrl: "",
      headerImage: '',
      id: "",
      progress: 0,
    };

    this.isPhysical = this.addProductObj.requiredShipping
  }


  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit() {
    this.initAddEditProductForm();
    this.getAllCategory();
    this.getAllTags()
    this.getAllBrands();
    this.getProductData()
    this.getAllTax();
    this.contentHeader = {
      headerTitle: 'BREADCRUMB.ADD_TITLE',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'BREADCRUMB.HOME',
            isLink: true,
            link: '/'
          },
          {
            name: 'BREADCRUMB.CATELOG',
            isLink: true,
            link: '/'
          },
          {
            name: 'BREADCRUMB.All_TITLE',
            isLink: true,
            link: '/products'
          },
          {
            name: 'BREADCRUMB.ADD_TITLE',
            isLink: false
          }
        ]
      }
    };
  }

  get f() {
    return this.addEditProductForm.controls;
  }

  initAddEditProductForm() {
    this.addEditProductForm = this.fb.group({
      productNameEn: [this.addProductObj.productNameEn, [Validators.required, Validators.minLength(5)]],
      productName: [this.addProductObj.productName, [Validators.required, Validators.minLength(5)]],
      codeProduct: [this.addProductObj.codeProduct, [Validators.required, Validators.maxLength(50)]],
      category: [],
      subCategories: [this.addProductObj.subCategories],
      subCategoryId: [],
      brandID: [this.brandList[0]],
      priceProduct: [this.addProductObj.priceProduct],
      costProduct: [this.addProductObj.costProduct],
      qteProducts: [this.addProductObj.qteProducts],
      minimumQTE: [this.addProductObj.minimumQTE],
      maximumQTE: [this.addProductObj.maximumQTE],
      weight: [this.addProductObj.weight],
      requiredShipping: [this.addProductObj.requiredShipping],
      publishOnStore: [this.addProductObj.publishOnStore],
      productShortDescriptionEn: [this.addProductObj.productShortDescriptionEn, [Validators.required, Validators.maxLength(250)]],
      productShortDescription: [this.addProductObj.productShortDescription, [Validators.required, Validators.maxLength(250)]],
      descriptionEn: [this.addProductObj.descriptionEn, [Validators.required]],
      description: [this.addProductObj.description, [Validators.required]],
      productPageTitle: [this.addProductObj.productPageTitle, [Validators.required, Validators.maxLength(70)]],
      productPageDescription: [this.addProductObj.productPageDescription, [Validators.required, Validators.maxLength(300)]],
      productPageUrl: [this.addProductObj.productPageUrl, Validators.required],
      tags: [this.addProductObj.tags],
      allowBackorders: [this.addProductObj.allowBackorders],
      width: [this.addProductObj.width],
      length: [this.addProductObj.length],
      height: [this.addProductObj.height],
      vatAmount: [this.addProductObj.vatAmount],
      status: [this.addProductObj.status],
      taxId: [this.addProductObj.taxId],
      publishDate: [this.addProductObj.publishDate],
      imageProduct: [[]]
    });
  }

  getAllCategory() {
    this.listService.getCategories().subscribe((categories: any) => {
      this.categoryList = categories
      console.log(this.categoryList);

    })
  }

  getAllTags() {
    this.productsService.getAllTags().subscribe((tags: any) => {
      this.tagList = tags
      console.log(this.tagList);

    })
  }

  getAllTax() {
    this.productsService.getAllTax().subscribe((tax: any) => {
      this.taxClass = tax
      console.log(this.taxClass);

    })
  }

  getAllBrands() {
    this.listService.getBrands().subscribe((brands: any) => {
      this.brandList = brands
      console.log(this.brandList);

    })
  }



  setStatus(event: any) {
    this.scheduled = false
    const value = event ? event.value : "";
    this.statusValue = value;
    if (this.statusValue === 2) {
      this.scheduled = true
    }
  }

  addSelectSubCategory() {
    let id = this.addEditProductForm.controls['subCategoryId'].value
    let selected_sub_category_index = this.productSubCategory.findIndex(
      (e: any) => e.id == id
    );
    if (selected_sub_category_index == -1) {
      this.productSubCategory.push({
        id: id,
        name: this.subCategoryName,

      })
    }



    console.log(this.productSubCategory)
  }

  selectSubCategory(event: any) {

    // this.productSubCategory.push({
    // subCategoryId: event.id,
    // })

    this.subCategoryName = event.name

    console.log(this.productSubCategory)
  }

  selectBrand(event: any) {
    this.brandValue = event.id;
  }

  removeImage(id) {
    for (let i = 0; i < this.productImages.length; i++) {
      if (this.productImages.indexOf(this.productImages[i]) === id) {
        this.productImages.splice(i, 1);
        break;
      }
    }
  }

  deleteCat(id) {
    console.log(id)
    // for (let i = 0; i < this.productSubCategory.length; i++) {
    let selected_sub_category_index = this.productSubCategory.findIndex(
      (e: any) => e.subCategoryId == id
    );
    if (selected_sub_category_index > -1) {
      this.productSubCategory.splice(selected_sub_category_index, 1);
    }


    // console.log(this.productSubCategory[i])
    // if (this.productSubCategory.indexOf(this.productSubCategory[i].subCategoryId) == id) {
    //   this.productSubCategory.splice(i, 1);
    //   console.log(this.productSubCategory);
    // }

    // console.log(this.productSubCategory[i])

    // }
  }

  getProductData() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.id = this.route.snapshot.paramMap.get('id')!;
        this.productsService.getProduct(this.id).subscribe((res: any) => {
          console.log(res[0])
          this.productData = res[0]

          this.contentHeader = {
            headerTitle: 'BREADCRUMB.EDIT_TITLE',
            actionButton: false,
            breadcrumb: {
              type: '',
              links: [
                {
                  name: 'BREADCRUMB.HOME',
                  isLink: true,
                  link: '/'
                },
                {
                  name: 'BREADCRUMB.CATELOG',
                  isLink: true,
                  link: '/'
                },
                {
                  name: 'BREADCRUMB.All_TITLE',
                  isLink: true,
                  link: '/products'
                },
                {
                  name: 'BREADCRUMB.EDIT_TITLE',
                  isLink: false
                }
              ]
            }
          };
          let imageArray = []
          this.productData.productImages.forEach(element => {
            imageArray.push(element.imageProduct)
          });

          let tagArray = []
          this.productData.tags.forEach(element => {
            tagArray.push(element.name)
          });

          this.productData.tags = tagArray

          console.log("product tags: ", this.productData.tags)

          console.log("productData.productImages: ", this.productData.productImages)

          this.productImages = this.productData.productImages
          this.productSubCategory = this.productData.subCategories
          this.addEditProductForm.controls['publishDate'].setValue(this.productData.publishDate)

          if (this.productData.requiredShipping === true) {
            this.isPhysical = true
          }
          // let subCategoryId = this.productData.subCategoryID

          // this.productsService.getSubCategoryById(subCategoryId).subscribe((category: any) => {
          //   console.log("sub category: ", category)
          //   let categoryId = category[0].categoryID
          //   this.addEditProductForm.controls['category'].setValue(categoryId)
          //   this.subCategory_items = []
          //   this.getAllSubCategory(categoryId)
          // })

          this.addEditProductForm.patchValue(this.productData as Products)
        })
      }
    })
  }
  /**
   * Add Item
   */
  addItem() {
    this.items.push({
      variation_type: '',
      variation: ''
    });
  }

  /**
   * DeleteItem
   *
   * @param id
   */
  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

  changePhysical(e: any) {
    if (e.target.checked) {
      this.isPhysical = true
    } else {
      this.isPhysical = false
    }
  }

  selectPercentage(e: boolean) {
    this.isPercentage = e
  }

  setDiscount(e: any) {
    console.log(e.target.value)
    this.discountPercentage = e.target.value
  }

  onSelectImage(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files && event.target.files[i]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.productImages.imageProduct = event.target.result
          // this.productImages[0].imageProduct="https://images-eu.ssl-images-amazon.com/images/I/41rM-yhw5gL._AC_SX184_.jpg"
          // this.productImages.push({
          //   imageProduct: event.target.result
          // })
        };

        console.log("product images: ", this.productImages)
        reader.readAsDataURL(event.target.files[i]);
        // var file =event.target.files[0];
        let formData = new FormData();
        formData.append('file', event.target.files[i]);
        this.successRemoveImg = true;
        this.productsService.addImage(formData)
          .pipe(
            map((event: any) => {
              if (event.type == HttpEventType.UploadProgress) {

                this.imageFile.progress = Math.round((event.loaded / event.total) * 100)

              }
              else if (event.type == HttpEventType.Response) {
                console.log(event.body)
                if (event.body) {

                  if (event.body.data) {

                    this.imageFile.isUpload = true;
                    // this.productImages.imageProduct = ''
                    if (this.id) {
                      this.productImages.push({
                        imageProduct: this.urlApiFile + event.body.data,
                        productId: this.id
                      })
                    } else {
                      this.productImages.push({
                        imageProduct: this.urlApiFile + event.body.data,
                        productId: 0
                      })
                    }

                    console.log("event.body.data: ", event.body.data)
                    console.log("product images: ", this.productImages)

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

          ).subscribe();
      }
    }
  }

  selectCategory(category: any) {
    console.log("category: ", category.value)
    this.subCategory_items = []
    this.getAllSubCategory(category.value)
  }

  getAllSubCategory(category_id) {
    this.productsService.getAllSubCategories(category_id).subscribe((res: any) => {
      this.subCategory_items = res.items
      console.log("sub categories: ", this.subCategory_items)
    })
  }

  checkValidation() {
    if (this.addProductObj.requiredShipping === true || this.addEditProductForm.controls['requiredShipping'].value === true) {
      if (this.addEditProductForm.controls['weight'].value <= 0) {
        this.toastr.error("weight must be bigger than 0", 'Error!', {
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }

      if (this.addEditProductForm.controls['width'].value <= 0) {
        this.toastr.error("width must be bigger than 0", 'Error!', {
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }

      if (this.addEditProductForm.controls['length'].value <= 0) {
        this.toastr.error("length must be bigger than 0", 'Error!', {
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }

      if (this.addEditProductForm.controls['height'].value <= 0) {
        this.toastr.error("height must be bigger than 0", 'Error!', {
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }
    }

    if (this.addEditProductForm.controls['priceProduct'].value <= 0) {
      this.toastr.error("base price must be bigger than 0", 'Error!', {
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }

    if (this.addEditProductForm.controls['costProduct'].value <= 0) {
      this.toastr.error("cost must be bigger than 0", 'Error!', {
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }

    if (this.addEditProductForm.controls['qteProducts'].value <= 0) {
      this.toastr.error("quantity must be bigger than 0", 'Error!', {
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }

    if (this.addEditProductForm.controls['minimumQTE'].value <= 0) {
      this.toastr.error("minimum quantity must be bigger than 0", 'Error!', {
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }

    if (this.addEditProductForm.controls['maximumQTE'].value <= 0) {
      this.toastr.error("maximum quantity must be bigger than 0", 'Error!', {
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }

    // if (this.addEditProductForm.controls['vatAmount'].value <= 0) {
    //   this.toastr.error("vat amount must be bigger than 0", 'Error!', {
    //     toastClass: 'toast ngx-toastr',
    //     closeButton: true
    //   });
    // }

    console.log("this.addEditProductForm.controls['brandID'].value: ", this.addEditProductForm.controls['brandID'].value)
    if (this.addEditProductForm.controls['brandID'].value === null) {
      this.toastr.error("please choose brand", 'Error!', {
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }

    if (this.addEditProductForm.controls['taxId'].value === null) {
      this.toastr.error("please choose tax class", 'Error!', {
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }

  }

  /**
* On Submit
*/
  addProduct() {
    this.submitted = true;

    this.checkValidation()


    // stop here if form is invalid
    if (this.addEditProductForm.invalid) {
      return;
    }

    this.loading = true;



    delete this.addEditProductForm.value.subCategoryId;
    delete this.addEditProductForm.value.imageProduct;
    delete this.addEditProductForm.value.category;

    // this.addEditProductForm.removeControl('subCategoryId');
    // this.addEditProductForm.removeControl('imageProduct');



    Object.assign(this.addProductObj, this.addEditProductForm?.value);
    this.addProductObj.subCategories = []


    console.log("djj: ", this.productSubCategory)
    for (let index = 0; index < this.productSubCategory.length; index++) {
      this.addProductObj.subCategories.push(
        this.productSubCategory[index].id
      )
    }

    if (this.statusValue === 2) {
      this.publishDate = this.addEditProductForm.controls['publishDate'].value[0];
    } else {
      this.publishDate = new Date();
    }


    // let tagArray = []
    // this.addEditProductForm.controls['tags'].value.forEach(element => {
    //   tagArray.push(element)
    // });

    this.addProductObj.productImages = this.productImages
    this.addProductObj.companyId = 3
    this.addProductObj.publishDate = this.publishDate;
    this.productsService.addProduct(this.addProductObj).subscribe((res: any) => {
      console.log(res)

      if (res) {
        this.router.navigate(['/admin/products/edit/', res.id])

      }
    }, (err: any) => {
      this.loading = false;

    }, (() => {

    }))
  }

  updateProduct() {
    this.submitted = true;

    this.checkValidation()

    if (this.addEditProductForm.invalid) {
      return;
    }

    this.loading = true;

    delete this.addEditProductForm.value.subCategoryId;
    delete this.addEditProductForm.value.imageProduct;
    delete this.addEditProductForm.value.category;
    delete this.addEditProductForm.value.subCategories;



    console.log("jhjhjh: ", this.addProductObj.subCategories)
    Object.assign(this.addProductObj, this.addEditProductForm?.value);
    console.log("this.productData.subCategories: ", this.productData.subCategories)
    for (let index = 0; index < this.productData.subCategories.length; index++) {
      this.addProductObj.subCategories.push(
        this.productSubCategory[index].id
      )
    }

    if (this.statusValue === 2) {
      this.publishDate = this.addEditProductForm.controls['publishDate'].value[0];
    } else {
      this.publishDate = new Date();
    }
    this.addProductObj.productImages = this.productImages
    this.addProductObj.companyId = 3
    this.addProductObj.publishDate = this.productData.publishDate
    console.log("djj: ", this.productSubCategory)








    this.productsService.editProduct(this.id, this.addProductObj).subscribe((res: any) => {
      if (res) {

        this.router.navigate(['/admin/products'])

      }
    }, (err: any) => {
      this.loading = false;

    }, (() => {

    }))

  }

  deleteProduct(id) {
    Swal.fire({
      title: 'Are you sure you want delete product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(id).subscribe((data: any) => {
          if (data.responseCode === 0) {
            Swal.fire({
              icon: 'success',
              title: 'product delete!',
              text: "product successfully deleted",
              showConfirmButton: true,
              timer: 1500
            })

            this.router.navigate(['/admin/products'])

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

