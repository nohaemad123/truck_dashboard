import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCityComponent } from './add-edit-city/add-edit-city.component';
import { CitiesComponent } from './cities/cities.component';

const routes: Routes = [

  {
    path: '',
    component: CitiesComponent,
    data: { animation: 'CitiesComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditCityComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditCityComponent,
    // canActivate: [AuthGuard]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
