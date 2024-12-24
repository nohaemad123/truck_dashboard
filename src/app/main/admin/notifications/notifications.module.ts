import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreCommonModule } from '@core/common.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { CoreSidebarModule } from '@core/components';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CsvModule } from '@ctrl/ngx-csv';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/@ui-components/ui-components.module';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';

@NgModule({
  declarations: [
    AllNotificationsComponent,
    UserNotificationsComponent
    ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    QuillModule.forRoot(),
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    InvoiceModule,
    CoreSidebarModule,
    ContentHeaderModule,
    CardSnippetModule,
    // DatePickerI18nModule,
    // DateTimePickerModule,
    CsvModule,
    FormsModule,
    ReactiveFormsModule,
    UiComponentsModule
  ]
})
export class NotificationsModule { }
