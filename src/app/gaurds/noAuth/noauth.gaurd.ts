import { AuthService } from '../../services/auth-service.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const preventEnteringLoginPageWhenUserIsLoggenIn = () => {
  const authService = inject(AuthService);

  return authService.currentUser$.pipe(
    map((user) => {
      if (user) return false;
      return true;
    })
  );
};
