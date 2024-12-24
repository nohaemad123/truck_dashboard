import { AddEditBankComponent } from './add-edit-bank/add-edit-bank.component';
import { BanksComponent } from './banks/banks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    component: BanksComponent,
    data: { animation: 'BanksComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditBankComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditBankComponent,
    // canActivate: [AuthGuard]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule { }
