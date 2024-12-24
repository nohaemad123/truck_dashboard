import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSetApartComponent } from './all-set-apart/all-set-apart.component';
import { AddEditSetApartComponent } from './add-edit-set-apart/add-edit-set-apart.component';

const routes: Routes = [
  {
    path: '',
    component: AllSetApartComponent,
    data: { animation: 'AllBannarsComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditSetApartComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditSetApartComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetApartRoutingModule { }
