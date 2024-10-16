import { AttributeType } from '@proxy/tedu-ecommerce/product-attributes';
import type { BaseListFilterDto } from '../../models';

export interface AddUpdateProductAttributeDto {
  productId?: string;
  attributeId?: string;
  dateTimeValue?: string;
  decimalValue?: number;
  intValue?: number;
  varcharValue?: string;
  textValue?: string;
}

export interface ProductAttributeListFilterDto extends BaseListFilterDto {
  productId?: string;
}

export interface ProductAttributeValueDto {
  id?: string;
  productId?: string;
  attributeId?: string;
  code?: string;
  dataType: AttributeType;
  label?: string;
  dateTimeValue?: string;
  decimalValue?: number;
  intValue?: number;
  textValue?: string;
  varcharValue?: string;
  dateTimeId?: string;
  decimalId?: string;
  intId?: string;
  textId?: string;
  varcharId?: string;
}
