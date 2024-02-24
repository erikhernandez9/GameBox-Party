import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/utils/local-storage.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const adminGuard: CanMatchFn = (route, state) => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  return userService.validateUser().pipe(
    map((res) => {
      return authService.isAdmin();
    }),
    catchError((error) => {
      localStorageService.removeToken();
      localStorageService.removeUser();
      router.navigate(['/sign-in']);
      return of(false);
    })
  );
};

export const userGuard: CanMatchFn = (route, state) => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  return userService.validateUser().pipe(
    map((res) => {
      return authService.isUser();
    }),
    catchError((error) => {
      localStorageService.removeToken();
      localStorageService.removeUser();
      router.navigate(['/sign-in']);
      return of(false);
    })
  );
};

export const isSignedGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService)
  return !authService.isUser();
};