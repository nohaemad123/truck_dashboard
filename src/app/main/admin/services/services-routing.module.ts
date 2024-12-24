import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllServicesComponent } from './all-services/all-services.component';
import { AddEditServiceComponent } from './add-edit-service/add-edit-service.component';

const routes: Routes = [
  {
    path: '',
    component: AllServicesComponent,
    data: { animation: 'AllBannarsComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditServiceComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditServiceComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
