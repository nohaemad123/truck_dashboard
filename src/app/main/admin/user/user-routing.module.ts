import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    component: UsersComponent,
    data: { animation: 'UsersComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditUserComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditUserComponent,
    // canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
