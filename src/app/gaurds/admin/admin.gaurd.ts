import { inject } from '@angular/core';
import { TokenService } from '../../services/token-service.service';
import { Role } from '../../types/user.type';
import { AuthService } from '../../services/auth-service.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

export const AdminGaurd = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map((user) => {
      if (user) return user.roles.includes(Role.ROLE_ADMIN.toString());
      else {
        router.navigate(['/']);
        return false;
      }
    })
  );
  //    let user  =  inject(TokenService)
  //   let roles= user.decodeToken()?.roles
  //   console.log(roles)
  //   if(roles?.includes(Role.ROLE_ADMIN.toString())) return true
  //    return false
};
