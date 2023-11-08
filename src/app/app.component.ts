import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = `My Blog`;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.redirectToHomeIfAtRoot();
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
