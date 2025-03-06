import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem.models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cartsSource = new BehaviorSubject<CartItem[]>([]);
  currentCarts = this.cartsSource.asObservable();

  changeCarts(carts: CartItem[]) {
    this.cartsSource.next(carts);
  }

  updateCart(newCarts: CartItem[]): void {
    this.cartsSource.next([...newCarts]);
  }
}
