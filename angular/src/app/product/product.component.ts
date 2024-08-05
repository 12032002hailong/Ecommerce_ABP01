import { AuthService, PagedResultDto } from '@abp/ng.core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../proxy/products/products.service';
import { ProductInListDto } from '@proxy/products';
import { Subject, takeUntil } from 'rxjs';
import { ProductCategoriesService, ProductCategoryInListDto } from '@proxy/product-categories';

@Component({
  selector: 'app-home',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  blockedPanel: boolean = false;
  items: ProductInListDto[] = [];

  //Paging variables
  public skipCount: number = 0;
  public maxResultCount: number = 10;
  public totalCount: number;

  //Filter
  productCategories: any[] = [];
  keyword: string = '';
  categoryId: string = '';

  constructor(
    private productService: ProductsService,
    private productCategoriesService: ProductCategoriesService
  ) {}

  ngOnInit(): void {
    this.loadProductCategories();
    this.loadData();
  }

  loadData() {
    this.productService
      .getListFilter({
        keyword: this.categoryId,
        categoryId: this.categoryId,
        maxResultCount: this.maxResultCount,
        skipCount: this.skipCount,
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: PagedResultDto<ProductInListDto>) => {
          this.items = response.items;
          this.totalCount = response.totalCount;
        },
        error: () => {},
      });
  }

  loadProductCategories() {
    this.productCategoriesService.getListAll().subscribe((response: ProductCategoryInListDto[]) => {
      response.forEach(element => {
        this.productCategories.push({
          value: element.id,
          name: element.name,
        });
      });
    });
  }

  pageChanged(event: any) {
    this.skipCount = (event.page - 1) * this.maxResultCount;
    this.maxResultCount = event.rows;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
