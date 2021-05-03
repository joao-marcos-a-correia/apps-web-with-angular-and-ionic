import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FramePage } from './pages/shared/frame/frame.page';
import { AuthorizedGuard } from './guards/authorized.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginPageModule) },
  // { path: '', loadChildren: './pages/shared/frame/frame.module#FramePageModule' },
  {
    path: '',
    component: FramePage,
    canActivate: [AuthorizedGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./pages/store/orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'orders/:number',
        loadChildren: () => import('./pages/store/order-details/order-details.module').then(m => m.OrderDetailsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
