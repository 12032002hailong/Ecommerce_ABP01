import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Trang chủ',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }],
      },
      {
        label: 'Sản phẩm',
        items: [
          {
            label: 'Danh sách sản phẩm',
            icon: 'pi pi-fw pi-image',
            routerLink: ['/catalog/product'],
            permission: 'TeduEcomAdminCatalog.Product',
          },
          {
            label: 'Danh sách thuộc tính',
            icon: 'pi pi-fw pi-image',
            routerLink: ['/catalog/attribute'],
            permission: 'TeduEcomAdminCatalog.Attribute',
          },
          {
            label: 'Danh sách nhà sản xuất',
            icon: 'pi pi-fw pi-image',
            routerLink: ['/catalog/manufacturer'],
            permission: 'TeduEcomAdminCatalog.Manufacturer',
          },
          {
            label: 'Danh sách loại sản phẩm',
            icon: 'pi pi-fw pi-image',
            routerLink: ['/catalog/productCategory'],
            permission: 'TeduEcomAdminCatalog.ProductCategory',
          },
        ],
      },
      {
        label: 'Hệ thống',
        items: [
          {
            label: 'Danh sách quyền',
            icon: 'pi pi-fw pi-image',
            routerLink: ['/system/role'],
            permission: 'AbpIdentity.Roles',
          },
          {
            label: 'Danh sách người dùng',
            icon: 'pi pi-fw pi-image',
            routerLink: ['/system/user'],
            permission: 'AbpIdentity.Users',
          },
        ],
      },
    ];
  }
}
