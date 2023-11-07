import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    title: 'Login',
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then((m) => m.LogoutModule),
    title: 'Logout',
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then((m) => m.SignupModule),
    title: 'Signup',
  },
  {
    path: 'unsubscribe',
    loadChildren: () => import('./unsubscribe/unsubscribe.module').then((m) => m.UnsubscribeModule),
    title: 'Unsubscribe',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
