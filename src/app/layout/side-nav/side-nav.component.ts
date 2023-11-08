import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnChanges {
  @Input()
  open: boolean = false;

  @Input()
  mobileQueryMatches = false;

  @ViewChild('sidenav')
  sidenav!: MatDrawer;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      this.sidenav?.toggle();
    }
  }
}
