import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginHomeComponent } from './login-home/login-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
