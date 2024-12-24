import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendNotficationComponent } from './send-notfication/send-notfication.component';

const routes: Routes = [
  {
    path: '',
    component: SendNotficationComponent,
    data: { animation: 'SendNotficationComponent' },
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotifcationsRoutingModule { }
