import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AttributeComponent } from './attribute/attribute.component';
import { permissionGuard } from '@abp/ng.core';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'TeduEcomAdminCatalog.Product',
    },
  },
  {
    path: 'attribute',
    component: AttributeComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'TeduEcomAdminCatalog.Attribute',
    },
  },
  {
    path: 'manufacturer',
    component: ManufactureComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'TeduEcomAdminCatalog.Manufacturer',
    },
  },
  {
    path: 'productCategory',
    component: CategoryComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'TeduEcomAdminCatalog.ProductCategory',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
