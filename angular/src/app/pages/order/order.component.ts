import { NgForOf } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { CartItem } from 'src/app/models/cartItem.models';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [DataViewModule, NgForOf],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit, OnChanges {
  carts: CartItem[];
  totalPrice: number = 0;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.currentCarts.subscribe(carts => (this.carts = carts));
    console.log(this.carts);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes.carts);
    if (this.carts && this.carts.length > 0) {
      let sum = 0;
      this.carts.map(item => {
        sum += item.quantity * item.quantity;
      });
      this.totalPrice = sum;
    } else {
      this.totalPrice = 0;
    }
  }
}
