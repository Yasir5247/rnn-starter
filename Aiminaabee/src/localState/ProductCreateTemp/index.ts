import { updateProductImages, updateProductTemp, clearProductTemp } from './mutations';
import { productCreateTempVar } from '../../localState';

export const productRegisterMutations = {
  updateImages: updateProductImages(productCreateTempVar),
  updateProduct: updateProductTemp(productCreateTempVar),
  clearTemp: clearProductTemp(productCreateTempVar),
};
