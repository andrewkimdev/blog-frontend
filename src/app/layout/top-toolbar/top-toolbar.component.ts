import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { selectIsLoggedIn } from 'src/app/account/store/auth.selectors';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
})
export class TopToolbarComponent implements OnDestroy {

  isLoggedIn = false;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
  ) {}

  isLoggedInSub = this.store.select(selectIsLoggedIn).pipe(
    takeUntil(this.destroy$),
    tap((isLoggedIn) => {
      // N.B. To address NGError 100
      setTimeout(() => this.isLoggedIn = isLoggedIn, 0);
    }),
  ).subscribe();

  @Input()
  title = 'Default App Name';

  @Output()
  toggleSidenav = new EventEmitter<void>();

  onToggleButtonClicked(): void {
    this.toggleSidenav.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
