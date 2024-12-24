import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTruckNotificationsComponent } from './all-truck-notifications/all-truck-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: AllTruckNotificationsComponent,
    data: { animation: 'AllBannarsComponent' },
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TruckNotificationsRoutingModule { }
