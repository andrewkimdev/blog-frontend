import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthSession } from '@supabase/supabase-js';

import { SupabaseService } from 'src/app/core/services/supabase.service';
import { Profile } from 'src/app/shared/types'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  profile!: Profile;

  @Input()
  session!: AuthSession;

  updateProfileForm = this.fb.group({
    username: '',
    website: '',
    avatar_url: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private readonly fb: FormBuilder,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProfile();

    const { username, website, avatar_url } = this.profile;
    this.updateProfileForm.patchValue({
      username,
      website,
      avatar_url,
    });
  }

  async getProfile() {
    try {
      this.loading = true;
      const { user } = this.session;
      const { data: profile, error, status } = await this.supabase.profile(user);

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true;
      const { user } = this.session;

      const username = this.updateProfileForm.value.username as string;
      const website = this.updateProfileForm.value.website as string;
      const avatar_url = this.updateProfileForm.value.avatar_url as string;

      const { error } = await this.supabase.updateProfile({
        id: user.id,
        username,
        website,
        avatar_url,
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    await this.supabase.signOut();
  }
}
