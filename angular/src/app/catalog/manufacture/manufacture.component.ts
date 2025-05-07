import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManufacturerDto, ManufacturerInListDto } from '@proxy/catalog/manufacturers';
import { elementAt, Subject, take, takeUntil } from 'rxjs';
import { ManufacturersService } from '../../proxy/catalog/manufacturers/manufacturers.service';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { NgIf } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from '../../shared/services/notification.service';
import { ConfirmationService } from 'primeng/api';
import { ManufactureDetailComponent } from './manufacture-detail.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-manufacture',
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
  templateUrl: './manufacture.component.html',
  styleUrl: './manufacture.component.scss',
})
export class ManufactureComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  blockedPanel: boolean = false;

  items: ManufacturerInListDto[] = [];
  public selectedItems: ManufacturerInListDto[] = [];

  //Paging variables
  public currentPage: number = 1;
  public pageSize: number = 10;
  public totalCount: number;

  //Filter
  keyword: string = '';

  constructor(
    private manufacturersService: ManufacturersService,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.toggleBlockUI(true);
    this.loadData();
  }

  loadData() {
    const res = this.manufacturersService
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
    this.loadData();
  }

  showAddModal() {
    const ref = this.dialogService.open(ManufactureDetailComponent, {
      header: 'Thêm mới nhà sản xuất',
      width: '70%',
    });

    ref.onClose.subscribe((data: ManufacturerDto) => {
      if (data) {
        this.loadData();
        this.notificationService.showSuccess('Thêm mới nhà sản xuất thành công');
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
    const ref = this.dialogService.open(ManufactureDetailComponent, {
      data: {
        id: id,
      },
      header: 'Thêm mới nhà sản xuất',
      width: '70%',
    });

    ref.onClose.subscribe((data: ManufacturerDto) => {
      if (data) {
        this.loadData();
        this.selectedItems = [];
        this.notificationService.showSuccess('Cập nhật nhà sản xuất thành công');
      }
    });
    console.log('Nhà sản xuất cập nhật', this.selectedItems[0]);
  }

  deleteItems() {
    if (this.selectedItems.length === 0) {
      this.notificationService.showError('Bạn phải chọn ít nhất một nhà sản xuất');
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
    this.manufacturersService
      .deleteMultiple(ids)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Xoá nhà sản xuất thành công');
          this.loadData();
          this.selectedItems = [];
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
