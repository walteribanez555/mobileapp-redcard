import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authorization = localStorage.getItem('Authorization');



  if(!authorization || authorization === "ExternalUser902010" ){
    router.navigateByUrl('/auth');
  }


  return true;
};
