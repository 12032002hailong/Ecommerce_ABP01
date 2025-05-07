import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../proxy/orders/orders.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OrderDto } from '@proxy/orders';
import { CommonModule, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [TableModule, CommonModule, NgIf, BadgeModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  items: OrderDto[];
  public skipCount: number = 0;
  public maxResultCount: number = 5;

  constructor(
    private ordersService: OrdersService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.ordersService
      .getList({
        skipCount: this?.skipCount,
        maxResultCount: this?.maxResultCount,
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.items = res.items;
        },
        error: e => {
          console.log(e);
        },
      });
  }
}
