import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateOrderDto, OrdersService } from '@proxy/orders';
import { UserDto, UsersService } from '@proxy/system/users';
import { jwtDecode } from 'jwt-decode';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { skipUntil, Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CartItem } from '../../models/cartItem.models';
import { TokenStorageService } from 'src/app/shared/services/token.service';
import { v4 as uuidv4 } from 'uuid';
import { getVNPayUrlAPI } from 'src/app/layout/service/api';

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
    private ordersService: OrdersService,
    private tokenService: TokenStorageService
  ) {}

  paymentMethods: any[] = [
    { name: 'Thanh toán khi nhận hàng', key: '1' },
    { name: 'Thanh toán bằng VnPay', key: '2' },
  ];

  ngOnInit(): void {
    this.getUserId();
    this.getCarts();
    this.buildForm();
    this.loadFormOrder(this.id);
    this.selectedPaymentMethod = this.paymentMethods[0];
  }

  getCarts(): void {
    this.dataService.currentCarts.subscribe(carts => {
      this.carts = carts;
      this.calculateTotalPrice();
    });
  }

  getUserId(): void {
    const tokenStorage = this.tokenService.getToken();
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
    this.usersService.get(id).subscribe({
      next: (res: UserDto) => {
        this.selectedUser = res;
        this.buildForm();
      },
      error: e => {
        console.log(e);
      },
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

  async onSubmit() {
    const detailOrder = this.carts.map(item => {
      return {
        productId: item.product.id,
        sku: item.product.sku,
        quantity: item.quantity,
        price: item.product.sellPrice,
      };
    });

    const dataOrder: CreateOrderDto = {
      customerName: this.form.value.customerName,
      customerPhoneNumber: this.form.value.customerPhoneNumber,
      customerAddress: this.form.value.customerAddress,
      customerUserId: this.id,
      paymentMethod: this.selectedPaymentMethod.key,
      items: detailOrder,
    };

    const paymentRef = uuidv4();
    const dataOrderVnPay: CreateOrderDto = {
      customerName: this.form.value.customerName,
      customerPhoneNumber: this.form.value.customerPhoneNumber,
      customerAddress: this.form.value.customerAddress,
      customerUserId: this.id,
      paymentMethod: this.selectedPaymentMethod.key,
      paymentRef: paymentRef,
      items: detailOrder,
    };
    const paymentUrl: any = await getVNPayUrlAPI(this.totalPrice, 'vn', paymentRef);

    if (this.selectedPaymentMethod.key === 1) {
      this.ordersService.create(dataOrder).subscribe({
        next: (response: any) => {
          localStorage.removeItem('carts');
          this.carts = [];
          this.notificationService.showSuccess('Mua hàng thành công');
        },
        error: err => {
          this.notificationService.showError(err.error.error.message);
        },
      });
    } else {
      this.ordersService.create(dataOrderVnPay).subscribe({
        next: (response: any) => {
          if (paymentUrl?.data?.url) {
            window.location.href = paymentUrl.data.url;
            localStorage.removeItem('carts');
            this.carts = [];
            this.notificationService.showSuccess('Mua hàng thành công');
          }
        },
        error: err => {
          this.notificationService.showError(err.error.error.message);
        },
      });
    }
  }

  // ngOnDestroy(): void {
  //   this.ngUnsubscribe.next();
  //   this.ngUnsubscribe.complete();
  // }
}
