import { PagedResultDto } from '@abp/ng.core';
import { NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagedResult } from '@proxy';
import { ProductInListDto, ProductsService } from '@proxy/catalog/products';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-product-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss',
})
export class ProductHomeComponent {
  private ngUnsubscribe = new Subject<void>();
  public currentPage: number = 1;
  public pageSize: number = 10;
  public selectedItems: ProductInListDto[] = [];

  products: ProductInListDto[] = [];
  keyword: string = '';
  categoryId: string = '';

  constructor(
    private productService: ProductsService,
    private dialogService: DialogService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.productService
      .getListFilter({
        keyword: this?.keyword,
        categoryId: this?.categoryId,
        currentPage: this?.currentPage,
        pageSize: this?.pageSize,
      })

      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: any) => {
          this.products = response.results;
        },
        error: () => {},
      });
  }

  onChangeProduct() {
    const id = this.selectedItems[0].id;

    console.log('this.selectedItems[0]', this.selectedItems[0]);
  }

  pageChanged(event: any) {
    this.loadData();
  }
}
