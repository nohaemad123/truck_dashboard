import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';
import { UiComponentsModule } from '@core/@ui-components/ui-components.module';
import { AuthGuard } from 'app/auth/helpers/auth.guards';

const routes = [
  {
    path: '',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: OrderAddComponent,
    canActivate: [AuthGuard],
    data: { animation: 'flatpickr' }

  },
   {
    path: 'edit/:id',
    component: OrderAddComponent,
    canActivate: [AuthGuard],
    data: { animation: 'flatpickr' }
  },
  // {
  //   path: 'show/:id',
  //   component: ShowProductComponent,
  //   canActivate: [AuthGuard],
  //   data: { animation: 'flatpickr' }
  // }
  
];


@NgModule({
  declarations: [
    OrdersComponent,
    OrderAddComponent
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
  ]
})
export class OrdersModule { }
