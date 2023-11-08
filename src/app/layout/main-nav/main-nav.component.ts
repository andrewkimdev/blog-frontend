import { ChangeDetectorRef, Component, OnDestroy, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnDestroy {
  @Input()
  title = 'App Title';

  sidenavOpened = false;

  toggleSidenavOpen() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  mobileQuery!: MediaQueryList;

  private _mobileQueryListener!: () => void;

  constructor(
    private cdr: ChangeDetectorRef,
    private media: MediaMatcher,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.cdr.detectChanges();
    this.mobileQuery.addEventListener('resize', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('resize', this._mobileQueryListener);
  }
}
