import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { permissionGuard } from '@abp/ng.core';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductHomeModule {}
