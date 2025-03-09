import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from '@proxy/orders';
import { UserDto, UsersService } from '@proxy/system/users';
import { jwtDecode } from 'jwt-decode';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { skipUntil, Subject, takeUntil } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem.models';
import { DataService } from 'src/app/shared/services/data.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    DataViewModule,
    NgForOf,
    InputNumberModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    RadioButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  id: string;
  carts: CartItem[];
  totalPrice: number = 0;
  selectedPaymentMethod: any = null;
  selectedUser = {} as UserDto;
  customerAddress: string = '';

  public form: FormGroup;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private ordersService: OrdersService
  ) {}

  paymentMethods: any[] = [
    { name: 'Thanh toán khi nhận hàng', key: 'A' },
    { name: 'Chuyển khoản ngân hàng', key: 'B' },
  ];

  ngOnInit(): void {
    this.getUserId();
    this.getCarts();
    this.buildForm();
    this.loadFormOrder(this.id);
    this.selectedPaymentMethod = this.paymentMethods[1];
  }

  getUserId(): void {
    const tokenStorage = localStorage.getItem('token');
    const decodedToken: any = jwtDecode(tokenStorage);
    this.id = decodedToken.sub;
  }

  private buildForm() {
    this.form = this.fb.group({
      customerName: new FormControl(this.selectedUser.name, Validators.required),
      customerPhoneNumber: new FormControl(this.selectedUser.phoneNumber, Validators.required),
      customerAddress: new FormControl(this.customerAddress, Validators.required),
    });
  }

  loadFormOrder(id: string) {
    this.usersService
      .get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: UserDto) => {
          this.selectedUser = res;
          this.buildForm();
        },
        error: e => {
          console.log(e);
        },
      });
  }

  getCarts(): void {
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

  onSubmit() {
    const detailOrder = this.carts.map(item => {
      return {
        productId: item.product.id,
        sku: item.product.sku,
        quantity: item.quantity,
        price: item.product.sellPrice,
      };
    });

    const dataOrder: any = {
      customerName: this.form.value.customerName,
      customerPhoneNumber: this.form.value.customerPhoneNumber,
      customerAddress: this.form.value.customerAddress,
      customerUserId: this.id,
      items: detailOrder,
    };

    const res = this.ordersService
      .create(dataOrder)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Đặt hàng thành công');
          this.carts = [];
          localStorage.removeItem('carts');
        },
        error: err => {
          this.notificationService.showError(err.error.error.message);
        },
      });
  }
}
