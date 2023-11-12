import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-logout-home',
  templateUrl: './logout-home.component.html',
  styleUrls: ['./logout-home.component.scss']
})
export class LogoutHomeComponent implements OnInit {
  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
