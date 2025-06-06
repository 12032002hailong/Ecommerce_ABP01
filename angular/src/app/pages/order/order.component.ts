import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartItem } from 'src/app/models/cartItem.models';
import { DataService } from 'src/app/shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [DataViewModule, NgForOf, InputNumberModule, FormsModule, CommonModule, ButtonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  carts: CartItem[];
  totalPrice: number = 0;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.currentCarts.subscribe(carts => {
      this.carts = carts;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice =
      this.carts?.reduce((sum, item) => sum + item.product.sellPrice * item.quantity, 0) || 0;
  }

  updateQuantity(cartItem: CartItem, newQuantity: number): void {
    cartItem.quantity = newQuantity;
    this.calculateTotalPrice();
    this.dataService.updateCart(this.carts);
  }

  handleRemoveCart(id: string) {
    // Lấy giỏ hàng từ localStorage
    const cartStorage = localStorage.getItem('carts');
    if (cartStorage) {
      let carts = JSON.parse(cartStorage) as CartItem[];
      carts = carts.filter(item => item.id !== id);
      localStorage.setItem('carts', JSON.stringify(carts));
      this.carts = carts;
      this.calculateTotalPrice();
      this.dataService.changeCarts(carts);
    }
  }

  handleOrderProduct() {
    if (!this.carts.length) {
      this.notificationService.showError('Không tồn tại sản phẩm trong giỏ hàng.');
      return;
    }
    this.router.navigate(['/payment']);
  }
}
