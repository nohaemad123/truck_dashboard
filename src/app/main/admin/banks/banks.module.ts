import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanksRoutingModule } from './banks-routing.module';
import { BanksComponent } from './banks/banks.component';
import { AddEditBankComponent } from './add-edit-bank/add-edit-bank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/@ui-components/ui-components.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CsvModule } from '@ctrl/ngx-csv';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    BanksComponent,
    AddEditBankComponent
  ],
  imports: [
    CommonModule,
    BanksRoutingModule,
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
export class BanksModule { }
