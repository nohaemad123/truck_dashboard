import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPoliciesComponent } from './add-edit-privacypolicies/add-edit-privacypolicies.component';

const routes: Routes = [

   {
    path: '',
    component: PrivacyPoliciesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyPoliciesRoutingModule { }
