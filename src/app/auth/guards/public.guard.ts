import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';




const checkAuthStatus = (): boolean | Observable<boolean> => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router)

  return authService.checkAuthentication().pipe(
    /* tap((isAuthenticated) => console.log('isAuthenticated', isAuthenticated)), */
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['./']);
      }
    }),
    map((isAuthenticated) => !isAuthenticated )
  );
}


export const canPublicActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  /* console.log('CanActivate'); */
  /* console.log({ route, state }); */

  return checkAuthStatus();
}

export const canPublicMatchGuard: CanMatchFn = (router: Route, segments: UrlSegment[]) => {
  // console.log('CanMatch');
  // console.log({ route, segments });
  return checkAuthStatus();
}
