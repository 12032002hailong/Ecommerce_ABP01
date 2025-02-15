import { PagedResultDto } from '@abp/ng.core';
import { NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagedResult } from '@proxy';
import { ProductInListDto, ProductsService } from '@proxy/catalog/products';
import { Subject, takeUntil } from 'rxjs';

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
  products: ProductInListDto[] = [];
  keyword: string = '';
  categoryId: string = '';

  constructor(private productService: ProductsService) {}

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
          console.log(response);
        },
        error: () => {},
      });
  }

  formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  pageChanged(event: any) {
    this.loadData();
  }
}
