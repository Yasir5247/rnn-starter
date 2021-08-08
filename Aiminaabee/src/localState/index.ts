import { ReactiveVar, makeVar } from '@apollo/client';
import { CreateProductTempTypes, SignUpTempTypes, ShopCreateTempTypes } from '../models/localState';

//local state variables for user creation
export const userCreateTempVar: ReactiveVar<SignUpTempTypes> = makeVar<SignUpTempTypes>({
  method: '',
  name: '',
  email: '',
  password: '',
  contact: '',
  picture: '',
});

//local state variables for shop creation
export const shopCreateTempVar: ReactiveVar<ShopCreateTempTypes> = makeVar<ShopCreateTempTypes>({
  name: '',
  type: '',
  description: '',
  contact: '',
  categoryName: '',
  categoryId: undefined,
  deliveryLocations: [],
});

//local state variables for product creation
export const productCreateTempVar: ReactiveVar<CreateProductTempTypes> =
  makeVar<CreateProductTempTypes>({
    shopId: undefined,
    categoryId: undefined,
    conditionId: undefined,
    name: '',
    description: '',
    price: undefined,
    stock: undefined,
    shopName: '',
    categoryName: '',
    conditionName: '',
    productImages: [],
  });

//category filter screens
export const selectedCategoryVar = makeVar({
  categoryId: undefined,
  categoryName: '',
});
