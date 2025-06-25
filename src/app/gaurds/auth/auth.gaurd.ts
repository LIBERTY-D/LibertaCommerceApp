import { inject } from '@angular/core';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service.service';

export const authGaurd = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map((user) => {
      if (user) return true;
      return router.createUrlTree(['/login']);
    })
  );
};
