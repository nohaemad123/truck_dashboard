import { AddEditBussinesTypesComponent } from './add-edit-bussines-types/add-edit-bussines-types.component';
import { BussinesTypesComponent } from './bussines-types/bussines-types.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  
  {
    path: '',
    component: BussinesTypesComponent,
    data: { animation: 'BussinesTypesComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditBussinesTypesComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditBussinesTypesComponent,
    // canActivate: [AuthGuard]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BussinesTypesRoutingModule { }
