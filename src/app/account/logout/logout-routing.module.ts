import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LogoutHomeComponent } from './logout-home/logout-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LogoutHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoutRoutingModule {
}
