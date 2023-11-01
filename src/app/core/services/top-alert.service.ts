import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertMode = 'danger' | 'warning' | 'info' | 'success';
export interface AlertOptions {
  show: boolean;
  text: string;
  mode: AlertMode;
}
@Injectable({
  providedIn: 'root'
})
export class TopAlertService {
  private alertOptionsSubject = new BehaviorSubject<AlertOptions>({show: false, text: 'foobar', mode: 'info'});
  alertOptions$ = this.alertOptionsSubject.asObservable()

  showAlert(text: string, mode: AlertMode){
    const options: AlertOptions = {
      show: true, text, mode,
    }
    this.alertOptionsSubject.next(options);
  }

  closeAlert() {
    const options = { ...this.alertOptionsSubject.value, show: false }
    this.alertOptionsSubject.next(options);
  }
}
