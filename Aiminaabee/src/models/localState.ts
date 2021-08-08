import { PictureType } from './picture';

export interface SignUpTempTypes {
  method?: string;
  name?: string;
  email?: string;
  password?: string;
  contact?: string;
  picture?: string;
}

export interface DeliveryTypes {
  id: number;
  name: string;
}

export interface ShopCreateTempTypes {
  name?: string;
  type?: string;
  description?: string;
  contact?: string;
  categoryName?: string;
  categoryId?: number;
  deliveryLocations?: (DeliveryTypes | null)[];
}

export interface CreateProductTempTypes {
  shopId?: number;
  categoryId?: number;
  conditionId?: number;
  name?: string;
  description?: string;
  avatar?: string;
  price?: number;
  stock?: number;
  shopName?: string;
  categoryName?: string;
  conditionName?: string;
  productImages?: PictureType[];
}
