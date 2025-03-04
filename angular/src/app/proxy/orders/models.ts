import type { EntityDto } from '@abp/ng.core';
import { OrderStatus, PaymentMethod } from '@proxy/tedu-ecommerce/orders';

export interface CreateOrderDto {
  customerName?: string;
  customerPhoneNumber?: string;
  customerAddress?: string;
  customerUserId?: string;
  items: OrderItemDto[];
}

export interface OrderDto extends EntityDto<string> {
  code?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingFee: number;
  tax: number;
  total: number;
  subtotal: number;
  discount: number;
  grandTotal: number;
  customerName?: string;
  customerPhoneNumber?: string;
  customerAddress?: string;
  customerUserId?: string;
}

export interface OrderItemDto {
  orderId?: string;
  productId?: string;
  sku?: string;
  quantity: number;
  price: number;
}
