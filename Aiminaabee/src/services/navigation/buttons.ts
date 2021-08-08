import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import { ButtonsOptions } from './types';

const ICON_SIZE = 22;

export type Button =
  | 'heart'
  | 'bookmark'
  | 'message'
  | 'check'
  | 'search'
  | 'users'
  | 'shops'
  | 'next'
  | 'cancel'
  | 'menu'
  | 'addIcon'
  | 'filter';

export const buttons: ButtonsOptions = {
  heart: {
    id: 'heart',
    icon: Feather.getImageSourceSync(`heart`, ICON_SIZE),
  },
  bookmark: {
    id: 'bookmark',
    icon: Feather.getImageSourceSync(`bookmark`, ICON_SIZE),
  },
  message: {
    id: 'message',
    icon: MaterialIcons.getImageSourceSync(`inbox`, ICON_SIZE),
  },
  check: {
    id: 'check',
    icon: Ionicons.getImageSourceSync(`md-checkmark`, ICON_SIZE),
  },
  search: {
    id: 'search',
    icon: Ionicons.getImageSourceSync(`search`, ICON_SIZE),
  },
  users: {
    id: 'users',
    icon: Feather.getImageSourceSync(`user-plus`, ICON_SIZE),
  },
  shops: {
    id: 'shops',
    icon: Entypo.getImageSourceSync(`shop`, 20),
  },
  cancel: {
    id: 'cancel',
    text: 'cancel',
  },
  next: {
    id: 'next',
    text: 'Next',
  },
  menu: {
    id: 'menu',
    icon: Ionicons.getImageSourceSync(`md-menu-sharp`, ICON_SIZE),
  },
  addIcon: {
    id: 'addIcon',
    icon: Ionicons.getImageSourceSync(`md-add`, 30),
  },
  filter: {
    id: 'filter',
    icon: MaterialIcons.getImageSourceSync(`tune`, ICON_SIZE),
  },
};
