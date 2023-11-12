import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/account/store/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          const clonedRequest = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(clonedRequest);
        }
        return next.handle(req);
      }),
    );
  }
}
