import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionComponent } from './position/position.component'

const routes: Routes = [
  {path: 'positions', component: PositionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
