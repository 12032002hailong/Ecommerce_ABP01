import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductHomeDetailComponent } from './product-home-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProductHomeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductHomeRoutingModule {}
