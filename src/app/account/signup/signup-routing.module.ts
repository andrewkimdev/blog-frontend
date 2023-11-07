import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupHomeComponent } from './signup-home/signup-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignupHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule {
}
