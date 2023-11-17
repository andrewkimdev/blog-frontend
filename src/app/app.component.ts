import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import * as AuthActions from './account/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = `My Blog`;

  constructor(
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.redirectToHomeIfAtRoot();
    this.store.dispatch(AuthActions.init());
  }

  // AppRoutingModule's redirection has a bug so this is my walk-around solution.
  private redirectToHomeIfAtRoot() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(event => {
      const { url } = event as NavigationEnd;
      if (['/', ''].includes(url)) {
        this.router.navigateByUrl('/home').then();
      }
    });
  }
}
