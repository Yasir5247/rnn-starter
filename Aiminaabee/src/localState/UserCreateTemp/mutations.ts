import { ReactiveVar } from '@apollo/client';
import { SignUpTempTypes } from '../../models/localState';

export const updateUserTemp = (userCreateTempVar: ReactiveVar<SignUpTempTypes>) => {
  return (payload: SignUpTempTypes) => {
    let value = Object.values(payload)[0];
    const oldValues = userCreateTempVar();
    const newValues = { ...oldValues, [Object.keys(payload)[0]]: value };
    userCreateTempVar(newValues);
  };
};

export const clearUserTemp = (userCreateTempVar: ReactiveVar<SignUpTempTypes>) => {
  return () => {
    userCreateTempVar({});
  };
};
