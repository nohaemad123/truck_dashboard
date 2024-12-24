import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';

import { CoreCommonModule } from '@core/common.module';

import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';

import { DashboardService } from 'app/main/admin/dashboard/dashboard.service';

import { AnalyticsComponent } from 'app/main/admin/dashboard/analytics/analytics.component';
import { EcommerceComponent } from 'app/main/admin/dashboard/ecommerce/ecommerce.component';

const routesInternal:Routes = [

  { path: '', redirectTo:'statistics',pathMatch:'full' },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin], animation: 'danalytics' },
    resolve: {
      css: DashboardService,
      inv: InvoiceListService
    }
  },
  {
    path: 'statistics',
    component: EcommerceComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin], animation: 'danalytics' },
    resolve: {
      css: DashboardService,
      inv: InvoiceListService
    },   
    // data: { animation: 'decommerce' }
  }
];


export const internalRoutes = RouterModule.forChild(routesInternal);

@NgModule({
  declarations: [AnalyticsComponent, EcommerceComponent],
  imports: [
    CommonModule,
    // RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    InvoiceModule,
    internalRoutes
  ],
  providers: [DashboardService, InvoiceListService],
  exports: [EcommerceComponent]
})
export class DashboardModule {}
