import { ViewTruksComponent } from './view-truks/view-truks.component';
import { AddEditTruksComponent } from './add-edit-truks/add-edit-truks.component';
import { TruksComponent } from './truks/truks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    component: TruksComponent,
    data: { animation: 'TruksComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditTruksComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditTruksComponent,
    // canActivate: [AuthGuard]
  }

//   ,
//   {
//    path: 'RequestsTrucks',
//    component: RequestsTrucksComponent,
//    // canActivate: [AuthGuard]
//  }

 ,

  
   {
    path: 'View/:id',
    component: ViewTruksComponent,
    // canActivate: [AuthGuard]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TruksRoutingModule { }
