import { inject } from '@angular/core';
import { map } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';

import { selectToken } from 'src/app/account/store/auth.selectors';
import { Session } from '@supabase/supabase-js';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectToken).pipe(
    map((token) => {
      if (token) {
        const decodedToken = jwtDecode<Session>(token);
        console.log(decodedToken)
        // todo - change logic to use different role
        if (decodedToken.user?.email === 'kimbi@cliensoft.com') {
          return true;
        }
      }
      router.navigate(['/not-authorized']);
      return false;
    }),
  );
}
