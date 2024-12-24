import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendSmsComponent } from './send-sms/send-sms.component';

const routes: Routes = [
  {
    path: '',
    component: SendSmsComponent,
    data: { animation: 'SendSmsComponent' },
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsRoutingModule { }
