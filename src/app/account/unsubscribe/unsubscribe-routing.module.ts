import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginHomeComponent } from '../login/login-home/login-home.component';
import { UnsubscribeHomeComponent } from './unsubscribe-home/unsubscribe-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UnsubscribeHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnsubscribeRoutingModule {
}
