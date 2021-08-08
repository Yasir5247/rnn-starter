import { ReactiveVar } from '@apollo/client';
import { CreateProductTempTypes } from '../../models/localState';
import { PictureType } from '../../models/picture';

export const updateProductTemp = (productCreateTempVar: ReactiveVar<CreateProductTempTypes>) => {
  return (payload: CreateProductTempTypes) => {
    let value = Object.values(payload)[0];
    const oldValues = productCreateTempVar();
    const newValues = { ...oldValues, [Object.keys(payload)[0]]: value };
    productCreateTempVar(newValues);
  };
};

export const updateProductImages = (productCreateTempVar: ReactiveVar<CreateProductTempTypes>) => {
  return (payload: PictureType) => {
    console.log('payload', payload);
    const oldValues = productCreateTempVar();
    const oldproductImageValues = oldValues.productImages ?? [];
    const newValues = { ...oldValues, productImages: [...oldproductImageValues, payload] };
    productCreateTempVar(newValues);
    console.log('new values', newValues);
  };
};

export const clearProductTemp = (productCreateTempVar: ReactiveVar<CreateProductTempTypes>) => {
  return () => {
    productCreateTempVar({});
  };
};
