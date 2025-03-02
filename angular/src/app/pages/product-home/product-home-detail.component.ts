import { query } from '@angular/animations';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInListDto, ProductsService } from '@proxy/catalog/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-home-detail.component.html',
  styleUrl: './product-home-detail.component.scss',
})
export class ProductHomeDetailComponent {
  private ngUnsubscribe = new Subject<void>();

  id: string;
  product: any;

  days: any;
  hours: number;
  mins: number;
  secs: number;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService) {
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
  }, 1000);
}
