import { Component } from '@angular/core';
import { TopAlertService } from '../services/top-alert.service';

@Component({
  selector: 'app-top-alert',
  templateUrl: './top-alert.component.html',
  styleUrls: ['./top-alert.component.scss']
})
export class TopAlertComponent {
  constructor(private alertService: TopAlertService) {}

  options$ = this.alertService.alertOptions$;

  closeAlert() {
    this.alertService.closeAlert();
  }
}
