import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreDirectivesModule } from '@core/directives/directives';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';
import { ShowProductComponent } from './show-product/show-product.component';
import { UiComponentsModule } from '@core/@ui-components/ui-components.module';

const routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'add',
    component: ProductAddComponent,
    data: { animation: 'flatpickr' }

  },
   {
    path: 'edit/:id',
    component: ProductAddComponent,
    data: { animation: 'flatpickr' }
  },
  {
    path: 'show/:id',
    component: ShowProductComponent,
    data: { animation: 'flatpickr' }
  }
  
];


@NgModule({
  declarations: [
    ProductsComponent,
    ProductAddComponent,
    ShowProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgxDatatableModule,
    ContentHeaderModule,
    CardSnippetModule,
    CoreDirectivesModule,
    NgSelectModule,
    QuillModule.forRoot(),
    ToastrModule,
    UiComponentsModule


    ],

})
export class ProductsModule { }
