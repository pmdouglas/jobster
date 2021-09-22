import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionComponent } from './position/position.component'
import { PositionDetailComponent } from './position-detail/position-detail.component'
import { CandidatesComponent } from './candidates/candidates.component'
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component'

const routes: Routes = [
  {path: 'positions', component: PositionComponent},
  {path: 'positionDetail/:id', component: PositionDetailComponent},
  {path: 'candidates', component: CandidatesComponent},
  {path: 'candidateDetail/:id', component: CandidateDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
