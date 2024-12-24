import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DropDownComponent } from './drop-down/drop-down.component';// import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CsvModule } from '@ctrl/ngx-csv';
import { CustomTableComponent } from './table/component/table.component';
import { CoreCommonModule } from '@core/common.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal/components/modal-content/modal-content.component';

// const components =[
//   CarouselComponent,
//   TableComponent,FilterComponent,BreadCrumbComponent,
//   AttachmentsComponent,
//   ButtonComponent,
//   AttachmentFilesComponent,
//   MultiSelectComponent,
//   InputComponent,
//   LinkComponent,
//   FormComponent,
//   ModalComponent,
//   DropDownComponent,
//   ModalContentComponent,
//   PaginationComponent
// ]

// @NgModule({
//   declarations: [...components, MultiSelectComponent, PaginationComponent],
//   imports: [
//     CommonModule,
//     RouterModule,
//     HttpClientModule,
//     FormsModule,
//     ReactiveFormsModule,
//     // NgxPaginationModule
//   ],
//   exports:[...components],
//   entryComponents:[ModalComponent]
// })
const components = [
  DropDownComponent, CustomTableComponent,
  ModalContentComponent,
  ModalComponent,
]
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule,
    NgxDatatableModule,
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    CorePipesModule
    // NgxPaginationModule
  ],
  exports: [...components,CorePipesModule],
  entryComponents: []
})

export class UiComponentsModule { }

