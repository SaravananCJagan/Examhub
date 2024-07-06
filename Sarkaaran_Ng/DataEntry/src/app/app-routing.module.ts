import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { ManageRecruitmentBodiesComponent } from './manage-recruitment-bodies/manage-recruitment-bodies.component';
import { ManageResultsComponent } from './manage-results/manage-results.component';
import { ManagePyqsComponent } from './manage-pyqs/manage-pyqs.component';

const routes: Routes = [
  { path: '', component: ManageExamsComponent },
  { path: 'manage-recruitment-bodies', component: ManageRecruitmentBodiesComponent },
  { path: 'results', component: ManageResultsComponent },
  { path: 'pyqs', component: ManagePyqsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
