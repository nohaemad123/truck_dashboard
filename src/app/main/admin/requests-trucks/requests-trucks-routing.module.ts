import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRequestesTrucksComponent } from './all-requestes-trucks/all-requestes-trucks.component';
import { ViewTruksComponent } from '../truks/view-truks/view-truks.component';

const routes: Routes = [
  {
    path: '',
    component: AllRequestesTrucksComponent,
    // data: { animation: 'RequestsTrucks' },
    // canActivate: [AuthGuard]
  }
  ,
  {
   path: 'RequestsTrucks',
   component: AllRequestesTrucksComponent,
      // data: { animation: 'RequestsTrucks' },
   // canActivate: [AuthGuard]
 },
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
export class RequestsTrucksRoutingModule { }
