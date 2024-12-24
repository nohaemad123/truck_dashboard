import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllpagesComponent } from './allpages/allpages.component';
import { AddEditPageComponent } from './add-edit-page/add-edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: AllpagesComponent,
    data: { animation: 'AllBannarsComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditPageComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditPageComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticPagesRoutingModule { }
