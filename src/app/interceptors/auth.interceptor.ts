import {
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from '../services/localstorage.service';
import { SKIP_AUTH_CONTEXT, UserService } from '../services/user.service';
import { AuthService } from '../services/auth-service.service';
import { environment } from '../../environments/environment';

export const bearerTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const storage = inject(LocalStorageService);
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const skipAuth = req.context.get(SKIP_AUTH_CONTEXT);

  console.log('[INTECERPTOR 1]');
  const tokens = storage.getAuth(environment.LIBERTA_AUTH_KEY)?.data;
  const token = tokens?.access_token;

  const authReq = skipAuth
    ? req
    : req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 401 && !skipAuth) {
        return userService.refreshToken().pipe(
          switchMap((tokenResponse) => {
            const newAccessToken = tokenResponse.data.access_token;
            storage.setAuth(environment.LIBERTA_AUTH_KEY, tokenResponse);
            const retryReq = req.clone({
              headers: new HttpHeaders({
                Authorization: `Bearer ${newAccessToken}`,
              }),
            });

            return next(retryReq);
          }),
          catchError((refreshError) => {
            // if (refreshError.status === 401) {
            authService.logout();
            // }
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
