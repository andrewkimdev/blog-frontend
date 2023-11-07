import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss']
})
export class LoginHomeComponent {
  constructor(private fb: FormBuilder) {
  }

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      tap((res) => console.log(res)),
    ).subscribe();
  }

}
