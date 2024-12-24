import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditFrequentQuestionComponent } from './add-edit-frequent-question/add-edit-frequent-question.component';
import { AllfrequentQuestionsComponent } from './allfrequent-questions/allfrequent-questions.component';

const routes: Routes = [
 {
    path: '',
    component: AllfrequentQuestionsComponent,
    data: { animation: 'CitiesComponent' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'Add',
    component: AddEditFrequentQuestionComponent,
    // canActivate: [AuthGuard]
  },
   {
    path: 'Edit/:id',
    component: AddEditFrequentQuestionComponent,
    // canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequentQuestionsRoutingModule { }
