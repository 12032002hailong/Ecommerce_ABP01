import { query, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@proxy/catalog/products';
import { Subject, takeUntil } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem.models';
import { PrimeNgModuleModule } from 'src/app/PrimeNgModule/prime-ng-module/prime-ng-module.module';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-home-detail.component.html',
  styleUrl: './product-home-detail.component.scss',
  standalone: true,
  imports: [PrimeNgModuleModule],
})
export class ProductHomeDetailComponent {
  private ngUnsubscribe = new Subject<void>();

  id: string;
  product: any;

  days: any;
  hours: number;
  mins: number;
  secs: number;

  cart: CartItem;
  carts: CartItem[];

  currentQuantity: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private dataService: DataService
  ) {
    this.activatedRoute.paramMap.subscribe(query => {
      this.id = query.get('id');
    });

    this.loadData();
  }

  loadData() {
    this.productService
      .get(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: any) => {
          this.product = response;
        },
        error: e => {
          console.log(e);
        },
      });
  }

  x = setInterval(() => {
    let futureDate = new Date('Jan 4, 2026 15:34:24').getTime();
    let today = new Date().getTime();
    let distance = futureDate - today;
    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.secs = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      clearInterval(this.x);
      this.days = 'Offer is expired';
    }
  }, 300);

  handleAddToCart = () => {
    //update localStorage
    const cartStorage = localStorage.getItem('carts');
    if (cartStorage && this.product) {
      //update
      const carts = JSON.parse(cartStorage) as CartItem[];

      //check exist
      let isExistIndex = carts.findIndex(c => c.id === this.product.id);
      if (isExistIndex > -1) {
        carts[isExistIndex].quantity = carts[isExistIndex].quantity + this.currentQuantity;
      } else {
        carts.push({
          id: this.product.id,
          quantity: this.currentQuantity,
          product: this.product,
        });
      }
      localStorage.setItem('carts', JSON.stringify(carts));
      this.carts = carts;
    } else {
      //create
      const data = [
        {
          id: this.product.id,
          quantity: this.currentQuantity,
          product: this.product,
        },
      ];
      localStorage.setItem('carts', JSON.stringify(data));
      this.carts = data;
    }
    this.dataService.changeCarts(this.carts);
  };
}
