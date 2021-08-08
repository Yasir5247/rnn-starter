import { addToShopingCart, removeShoppingCartItem } from './mutations';
import { shoppingCartVar } from '../../services/client/cache';

export const shoppingCartMutations = {
  addToShopingCart: addToShopingCart(shoppingCartVar),
  removeShoppingCartItem: removeShoppingCartItem(shoppingCartVar),
};
