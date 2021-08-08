import { ReactiveVar } from '@apollo/client';
import { SelectedCategoryType } from '../types';

export const updateCategory = (selectedCategoryVar: ReactiveVar<SelectedCategoryType>) => {
  return (payload: SelectedCategoryType) => {
    const newValues = { ...payload };
    selectedCategoryVar(newValues);
  };
};

export const clearCategoryTemp = (selectedCategoryVar: ReactiveVar<SelectedCategoryType>) => {
  return () => {
    selectedCategoryVar({});
  };
};
