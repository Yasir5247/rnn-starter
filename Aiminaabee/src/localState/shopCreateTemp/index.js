import { updateShopTemp, clearShopTemp } from './mutations';
import { shopCreateTempVar } from '../../services/client/cache';

export const shopRegisterMutations = {
  updateShopTemp: updateShopTemp(shopCreateTempVar),
  clearShopTemp: clearShopTemp(shopCreateTempVar),
};
