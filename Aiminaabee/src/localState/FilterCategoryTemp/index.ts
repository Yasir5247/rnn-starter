import { updateCategory, clearCategoryTemp } from './mutations';
import { selectedCategoryVar } from '../';

export const categoryFilterMutions = {
  updateCategory: updateCategory(selectedCategoryVar),
  clearCategoryTemp: clearCategoryTemp(selectedCategoryVar),
};
