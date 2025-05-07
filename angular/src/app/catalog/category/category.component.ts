import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductCategoryDto, ProductCategoryInListDto } from '@proxy/catalog/product-categories';
import { Subject, takeUntil } from 'rxjs';
import { ProductCategoriesService } from '../../proxy/catalog/product-categories/product-categories.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ConfirmationService } from 'primeng/api';
import { ProductCategoryDetailComponent } from './category-detail.component';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { BlockUIModule } from 'primeng/blockui';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    PanelModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    BlockUIModule,
    BadgeModule,
    ProgressSpinnerModule,
    NgIf,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  blockedPanel: boolean = false;

  items: ProductCategoryInListDto[] = [];
  public selectedItems: ProductCategoryInListDto[] = [];
  //Paging variables
  public currentPage: number = 1;
  public pageSize: number = 10;
  public totalCount: number;

  //Filter
  keyword: string = '';

  constructor(
    private productCategoriesService: ProductCategoriesService,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.toggleBlockUI(true);
    this.loadData();
  }
  private toggleBlockUI(enabled: boolean) {
    if (enabled === true) {
      this.blockedPanel = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
      }, 1000);
    }
  }

  loadData() {
    const res = this.productCategoriesService
      .getListFilter({
        keyword: this?.keyword,
        currentPage: this?.currentPage,
        pageSize: this?.pageSize,
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: any) => {
          this.items = response.results;
          this.totalCount = response.totalCount;
          this.toggleBlockUI(false);
          console.log(this.items);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  pagedChanged(event: any) {
    console.log(event);
    this.loadData();
  }

  showAddModal() {
    const ref = this.dialogService.open(ProductCategoryDetailComponent, {
      header: 'Thêm mới danh mục sản phẩm',
      width: '70%',
    });

    ref.onClose.subscribe((data: ProductCategoryDto) => {
      if (data) {
        this.loadData();
        this.notificationService.showSuccess('Thêm mới danh mục sản phẩm thành công');
        this.selectedItems = [];
      }
    });
  }

  showEditModal() {
    if (this.selectedItems.length === 0) {
      this.notificationService.showError('Bạn phải lựa chọn một bản ghi');
      return;
    }

    const id = this.selectedItems[0].id;
    const ref = this.dialogService.open(ProductCategoryDetailComponent, {
      data: {
        id: id,
      },
      header: 'Thêm mới danh mục sản phẩm',
      width: '70%',
    });

    ref.onClose.subscribe((data: ProductCategoryDto) => {
      if (data) {
        this.loadData();
        this.selectedItems = [];
        this.notificationService.showSuccess('Cập nhật danh mục sản phẩm thành công');
      }
    });
    console.log('Danh mục sản phẩm', this.selectedItems);
  }

  deleteItems() {
    if (this.selectedItems.length === 0) {
      this.notificationService.showError('Bạn phải chọn ít nhất một danh mục sản phẩm');
      return;
    }

    let ids = [];
    this.selectedItems.forEach(element => {
      ids.push(element.id);
    });
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn xoá nhà sản xuất này ?',
      accept: () => {
        this.deleteItemsConfirmed(ids);
      },
    });
  }

  deleteItemsConfirmed(ids: string[]) {
    this.toggleBlockUI(true);
    this.productCategoriesService
      .deleteMultiple(ids)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Xoá danh mục sản phẩm thành công');
          this.loadData();
          this.selectedItems = [];
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
