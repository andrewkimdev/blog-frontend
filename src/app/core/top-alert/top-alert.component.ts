import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-alert',
  templateUrl: './top-alert.component.html',
  styleUrls: ['./top-alert.component.scss']
})
export class TopAlertComponent {
  @Input()
  show = true;

  @Input()
  text = 'App Level Alert';

  closeAlert(): void {
    this.show = false;
  }
}
