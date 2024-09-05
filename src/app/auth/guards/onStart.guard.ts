import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const onStartGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const onInit = localStorage.getItem('onInit');

  const authorization = localStorage.getItem('Authorization');

  if(!authorization  ){
    localStorage.setItem('Authorization', 'ExternalUser902010');
  }



  if(!onInit|| onInit === "0"){
    router.navigateByUrl('/welcome');

  }


  return true;
};
