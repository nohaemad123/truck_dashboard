import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { CoreTranslationService } from '@core/services/translation.service';
import { locale as arabic } from 'app/main/admin/products/i18n/ar';
import { locale as english } from 'app/main/admin/products/i18n/en';

import { ProductsService } from '../products.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import Swal from 'sweetalert2';
import { Table_Coloumns } from '../products.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ProductsComponent implements OnInit {
  // Public
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  // public SelectionType = SelectionType;
  public selected = [];
  public contentHeader: object;


  AllProducts: any;
  public selectRole: any = [
    { name: 'All', value: '' },
    { name: 'Admin', value: 'Admin' },
    { name: 'Author', value: 'Author' },
    { name: 'Editor', value: 'Editor' },
    { name: 'Maintainer', value: 'Maintainer' },
    { name: 'Subscriber', value: 'Subscriber' }
  ];

  public selectPlan: any = [
    { name: 'All', value: '' },
    { name: 'Basic', value: 'Basic' },
    { name: 'Company', value: 'Company' },
    { name: 'Enterprise', value: 'Enterprise' },
    { name: 'Team', value: 'Team' }
  ];

  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'Pending' },
    { name: 'Active', value: 'Active' },
    { name: 'Inactive', value: 'Inactive' }
  ];

  public selectedRole = [];
  public selectedPlan = [];
  public selectedStatus = [];
  public searchValue = '';

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public Table_Coloumns = Table_Coloumns
  public selections: any[] = [];


  constructor(
    private _coreTranslationService: CoreTranslationService,
    private productsService: ProductsService
  ) {
    this._unsubscribeAll = new Subject();
    this._coreTranslationService.translate(english, arabic);

  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedRole = this.selectRole[0];
    this.selectedPlan = this.selectPlan[0];
    this.selectedStatus = this.selectStatus[0];

    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.AllProducts = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
 * For ref only, log selected values
 *
 * @param selected
 */
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }


  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByRole(event) {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousPlanFilter, this.previousStatusFilter);
    this.AllProducts = this.temp;
  }

  /**
   * Filter By Plan
   *
   * @param event
   */
  filterByPlan(event) {
    const filter = event ? event.value : '';
    this.previousPlanFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, filter, this.previousStatusFilter);
    this.AllProducts = this.temp;
  }

  /**
   * Filter By Status
   *
   * @param event
   */
  filterByStatus(event) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, this.previousPlanFilter, filter);
    this.AllProducts = this.temp;
  }

  /**
   * Filter Rows
   *
   * @param roleFilter
   * @param planFilter
   * @param statusFilter
   */
  filterRows(roleFilter, planFilter, statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    roleFilter = roleFilter.toLowerCase();
    planFilter = planFilter.toLowerCase();
    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialNameMatch = row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
      const isPartialGenderMatch = row.currentPlan.toLowerCase().indexOf(planFilter) !== -1 || !planFilter;
      const isPartialStatusMatch = row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch && isPartialGenderMatch && isPartialStatusMatch;
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.contentHeader = {
      headerTitle: 'BREADCRUMB.All_TITLE',
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
            isLink: false
          }
        ]
      }
    };
  }



  getAllProducts() {
    this.productsService.getAllProducts().subscribe((products: any) => {
      this.AllProducts = products?.items
      console.log("products: ",this.AllProducts)
    });

    // this.productsService.getAllProducts().subscribe((products:any)=>{
    //   this.AllProducts = products.data.items
    //   console.log(this.AllProducts)
    //   for (let index = 0; index < this.AllProducts.length; index++) {
    //     console.log("categories name: ", this.AllProducts[index].subCategories.name)
    //     this.AllProducts[index].subCategoryName = this.AllProducts[index].subCategories.name;
    //     this.AllProducts[index].img = this.AllProducts[index].productImages[0].imageProduct?this.AllProducts[index].productImages[0].imageProduct:'';
    //     this.AllProducts[index].name = this.AllProducts[index].productName
    //     console.log("category: ",this.AllProducts[index].subCategoryName)
    //     console.log("category: ",this.AllProducts[index].img)
    // // return this.AllProducts[index]
    //   }
    // })
 
  }

  deleteProduct(id: any) {
    console.log(id)

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
          console.log("data: ",data)
          if (data===true) {
            Swal.fire({
              icon: 'success',
              title: 'product delete!',
              text: "product successfully deleted",
              showConfirmButton: true,
              timer: 1500
            })

            this.getAllProducts()
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

  /**
  * On destroy
  */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
