import AsyncStorage from '@react-native-async-storage/async-storage';

let token = '';

export const getTokenSync = () => token;

export const getToken = () =>
  AsyncStorage.getItem('@token')
    .then(tokenFromStorage => {
      token = tokenFromStorage || '';
      return token;
    })
    .catch(() => {
      token = '';
      return '';
    });
