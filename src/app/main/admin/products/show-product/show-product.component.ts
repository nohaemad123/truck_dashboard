import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service';
import { environment } from 'environments/environment';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ProductsService } from '../products.service';
import { locale as arabic } from 'app/main/admin/products/i18n/ar';
import { locale as english } from 'app/main/admin/products/i18n/en';
import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { Products } from '../products.model';
@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [repeaterAnimation]
})
export class ShowProductComponent implements OnInit {

  categoryList: any = [];
  brandList: any = [];
  productSubCategory:any;
  public urlApiFile = environment.urlApiFile;
  isPhysical:boolean
  scheduled:boolean
  status: any = [
    { name: "Published", value: 0 },
    { name: "Inactive", value: 1 },
    // { name: "Draft", value: 2 },
    { name: "Scheduled", value: 2 }
  ]

  productImages: any = [

  ];

  statusValue: boolean;
  subCategoryValue: any;
  brandValue: any;

  tagList: any = [
    { name: "New", value: "new" },
    { name: "Trending", value: "trending" },
    { name: "Sale", value: "sale" }
  ]

  product_template: any = [
    { name: "Default template", value: "default" }
  ]

  taxClass: any = [
    { name: "Taxable goods", value: "taxable goods" }
  ]

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
  id: any;
  productData: any;
  contentHeader: object

  public dateTimeOptions: FlatpickrOptions = {
    altInput: true,
    enableTime: true
  };

  addEditProductForm: any;
  addImageProductForm: any;
  successRemoveImg: boolean = false;

  /**
    * Constructor
    *
    * @param {CoreTranslationService} _coreTranslationService

    */
  constructor(
    private productsService: ProductsService,
    private _coreTranslationService: CoreTranslationService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    this._coreTranslationService.translate(english, arabic);

  }


  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit() {
    this.initAddEditProductForm();
    this.getProductData()
    this.getAllBrands()
    this.getAllTax();


    for (var control in this.addEditProductForm.controls) {
      this.addEditProductForm.controls[control].disable();
    }

    this.contentHeader = {
      headerTitle: 'BREADCRUMB.SHOW_TITLE',
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
            name: 'BREADCRUMB.SHOW_TITLE',
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
      productNameEn: ['', [Validators.required, Validators.minLength(5)]],
      productName: ['', [Validators.required, Validators.minLength(5)]],
      codeProduct: ['', [Validators.required, Validators.maxLength(50)]],
      brandID: [],
      priceProduct: ['', Validators.required],
      costProduct: ['', Validators.required],
      qteProducts: ['', Validators.required],
      minimumQTE: ['', Validators.required],
      maximumQTE: ['', Validators.required],
      weight: ['', Validators.required],
      requiredShipping: [true],
      publishOnStore: [true],
      productShortDescriptionEn: ['', [Validators.required, Validators.maxLength(250)]],
      productShortDescription: ['', [Validators.required, Validators.maxLength(250)]],
      descriptionEn: ['', [Validators.required]],
      description: ['', [Validators.required]],
      productPageTitle: ['', [Validators.required, Validators.maxLength(70)]],
      productPageDescription: ['', [Validators.required, Validators.maxLength(300)]],
      productPageUrl: ['', Validators.required],
      tags: [],
      allowBackorders: [],
      width: [],
      length: [],
      height: [],
      vatAmount: [],
      status: [],
      taxId: [],
      publishDate: [],
    });
  }

  getAllBrands() {
    this.productsService.getAllBrands().subscribe((brands: any) => {
      this.brandList = brands.items
      console.log("brands: ",this.brandList);

    })
  }

  getAllTax() {
    this.productsService.getAllTax().subscribe((tax: any) => {
      this.taxClass = tax
      console.log(this.taxClass);

    })
  }

  getProductData() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.id = this.route.snapshot.paramMap.get('id')!;
        this.productsService.getProduct(this.id).subscribe((res: any) => {
          console.log(res[0])
          this.productData = res[0]
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



  getAllSubCategory(category_id) {
    this.productsService.getAllSubCategories(category_id).subscribe((res: any) => {
      this.subCategory_items = res.items
      console.log("sub categories: ", this.subCategory_items)
    })
  }

}
