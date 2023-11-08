import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent {
  @Input()
  title = 'Default App Name';

  @Output()
  toggleSidenav = new EventEmitter<void>();

  onToggleButtonClicked(): void {
    this.toggleSidenav.emit();
  }
}
