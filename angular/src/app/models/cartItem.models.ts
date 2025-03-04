import { ProductDto } from '../proxy/catalog/products/models';
export interface CartItem {
  id: string;
  product: ProductDto;
  quantity: number;
}
