import { inject } from '@angular/core';
import { map } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';

import { selectToken } from 'src/app/account/store/auth.selectors';

import { AuthToken } from 'src/app/shared/types';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectToken).pipe(
    map((token) => {
      if (token) {
        const decodedToken = jwtDecode<AuthToken>(token);
        console.log(decodedToken.roles)
        if (decodedToken.roles && decodedToken.roles.includes('admin')) {
          return true;
        }
      }
      router.navigate(['/not-authorized']);
      return false;
    }),
  );
}
