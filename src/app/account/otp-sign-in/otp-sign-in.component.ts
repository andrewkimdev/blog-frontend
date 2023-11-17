import { Component } from '@angular/core';
import { SupabaseService } from '../../core/services/supabase.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-sign-in',
  templateUrl: './otp-sign-in.component.html',
  styleUrls: ['./otp-sign-in.component.scss']
})
export class OtpSignInComponent {
  loading = false;
  signInForm = this.fb.group({
    email: ['', Validators.email],
  })

  constructor(
    private readonly supabase: SupabaseService,
    private readonly fb: FormBuilder,
  ){}

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signIn(email);
      if (error) throw error;
      alert('Check your email for the login link');
    } catch(error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }

}
