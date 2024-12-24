import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBannarsComponent } from './all-bannars/all-bannars.component';
import { AddEditBannarComponent } from './add-edit-bannar/add-edit-bannar.component';

const routes: Routes = [
  {
    path: '',
    component: AllBannarsComponent,
    data: { animation: 'AllBannarsComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditBannarComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditBannarComponent,
    // canActivate: [AuthGuard]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannarsRoutingModule { }
