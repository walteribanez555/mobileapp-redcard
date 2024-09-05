import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { onStartGuard } from './auth/guards/onStart.guard';

export const routes: Routes = [
  {
    path: 'home',
    canActivate : [onStartGuard],
    children : [
      {
        path: '',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'services/:id',
        loadComponent: () => import('./home/service/service.page').then( m => m.ServicePage)
      },
      {
        path: 'coverages/:id',
        loadComponent: () => import('./home/coverage/coverage.page').then( m => m.CoveragePage)
      },
      {
        path: 'discounts/:id',
        loadComponent: () => import('./home/discount/discount.page').then( m => m.DiscountPage)
      },
    ]
  },
  {
    path : 'auth',
    loadComponent: () => import('./auth/auth.page').then( m => m.AuthPage)
  },
  {
    path : 'voucher',
    canActivate : [authGuard, onStartGuard],
    loadComponent: () => import('./voucher/voucher.page').then( m => m.VoucherPage),
  },
  {
    path : 'voucher/:id',
    canActivate  : [authGuard, onStartGuard],
    loadComponent : () => import('./my-voucher/my-voucher.component').then( m => m.MyVoucherComponent),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },



];
