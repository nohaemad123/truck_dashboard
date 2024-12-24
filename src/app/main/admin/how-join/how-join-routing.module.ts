import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllHowJoinComponent } from './all-how-join/all-how-join.component';
import { AddHowJoinComponent } from './add-how-join/add-how-join.component';

const routes: Routes = [
  {
    path: '',
    component: AllHowJoinComponent,
    data: { animation: 'AllBannarsComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddHowJoinComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddHowJoinComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowJoinRoutingModule { }
