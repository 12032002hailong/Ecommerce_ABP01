import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ProductHomeDetailComponent } from './pages/product-home/product-home-detail.component';
import { OrderComponent } from './pages/order/order.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { HistoryComponent } from './pages/history/history.component';
import { VnPayComponent } from './component/vn-pay/vn-pay.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    component: AppLayoutComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'product',
    component: AppLayoutComponent,
    children: [{ path: ':id', component: ProductHomeDetailComponent }],
  },
  {
    path: 'order',
    component: AppLayoutComponent,
    children: [{ path: '', component: OrderComponent }],
  },
  {
    path: 'payment',
    component: AppLayoutComponent,
    children: [{ path: '', component: PaymentComponent }],
  },
  {
    path: 'history',
    component: AppLayoutComponent,
    children: [{ path: '', component: HistoryComponent }],
  },
  {
    path: 'system',
    loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
    component: AppLayoutComponent,
  },
  {
    path: 'catalog',
    loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule),
    component: AppLayoutComponent,
  },
  {
    path: 'vnpay/return-url',
    component: VnPayComponent,
  },

  // {
  //   path: 'account',
  //   loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  // },
  // {
  //   path: 'identity',
  //   loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  // },
  // {
  //   path: 'tenant-management',
  //   loadChildren: () =>
  //     import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  // },
  // {
  //   path: 'setting-management',
  //   loadChildren: () =>
  //     import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
