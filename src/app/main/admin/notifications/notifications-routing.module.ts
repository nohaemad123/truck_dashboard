import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: AllNotificationsComponent,
    data: { animation: 'CitiesComponent' },
    // canActivate: [AuthGuard]
  },
  
  {
    path: 'User-notifications/:id',
    component: UserNotificationsComponent,
    data: { animation: 'CitiesComponent' },
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
