import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllpagesComponent } from '../static-pages/allpages/allpages.component';
import { AddEditPackageComponent } from './add-edit-package/add-edit-package.component';
import { AllPackagesComponent } from './all-packages/all-packages.component';

const routes: Routes = [
  {
    path: '',
    component: AllPackagesComponent,
    data: { animation: 'CitiesComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditPackageComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditPackageComponent,
    // canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
