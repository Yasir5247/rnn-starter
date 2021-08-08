import { updateUserTemp, clearUserTemp } from './mutations';
import { userCreateTempVar } from '../';

export const userRegisterMutations = {
  updateUser: updateUserTemp(userCreateTempVar),
  clearTemp: clearUserTemp(userCreateTempVar),
};
