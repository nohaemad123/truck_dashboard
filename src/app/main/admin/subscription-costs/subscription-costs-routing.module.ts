import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllASubscriptioncostComponent } from './all-asubscriptioncost/all-asubscriptioncost.component';
import { AddEditSubscriptioncostComponent } from './add-edit-subscriptioncost/add-edit-subscriptioncost.component';

const routes: Routes = [
  {
    path: '',
    component: AllASubscriptioncostComponent,
    data: { animation: 'AllASubscriptioncostComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditSubscriptioncostComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditSubscriptioncostComponent,
    // canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionCostsRoutingModule { }
