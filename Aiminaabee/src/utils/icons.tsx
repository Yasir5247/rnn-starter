import React from 'react';
import { Colors } from 'react-native-ui-lib';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ICON_SIZE = 18;

export const beeIconSet: any = {
  rightArrow: {
    id: 'rightArrow',
    icon: <AntDesign name="right" size={16} color={Colors.iconColor} />,
  },
  verified: {
    id: 'verified',
    icon: <AntDesign name="checkcircle" size={16} color={Colors.iconColor} />,
  },
  heart: {
    id: 'heart',
    icon: <FontAwesome name="heart-o" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  bookmark: {
    id: 'bookmark',
    icon: <FontAwesome name="bookmark-o" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  file: {
    id: 'file',
    icon: <FontAwesome name="file-o" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  users: {
    id: 'users',
    icon: <FontAwesome name="user-o" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  edit: {
    id: 'edit',
    icon: <SimpleLineIcons name="pencil" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  location: {
    id: 'location',
    icon: <SimpleLineIcons name="location-pin" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  adress: {
    id: 'adress',
    icon: <SimpleLineIcons name="tag" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  book: {
    id: 'book',
    icon: <SimpleLineIcons name="book-open" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  info: {
    id: 'info',
    icon: <SimpleLineIcons name="info" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  noteBook: {
    id: 'noteBook',
    icon: <SimpleLineIcons name="notebook" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  check: {
    id: 'check',
    icon: <Feather name="check" size={30} color={Colors.iconColor} />,
  },
  remove: {
    id: 'remove',
    icon: <Feather name="x" size={30} color={Colors.iconColor} />,
  },
  filter: {
    id: 'filter',
    icon: <AntDesign name="filter" size={15} color={Colors.iconColor} />,
  },
  picture: {
    id: 'picture',
    icon: <AntDesign name="picture" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  database: {
    id: 'picture',
    icon: <MaterialCommunityIcons name="database" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  eye: {
    id: 'picture',
    icon: <AntDesign name="eyeo" size={ICON_SIZE} color={Colors.iconColor} />,
  },
  mailBox: {
    id: 'mailBox',
    icon: <Ionicons name="md-mail-unread-outline" size={30} color={Colors.iconColor} />,
  },
  theme: {
    id: 'theme',
    icon: <MaterialCommunityIcons name="invert-colors" size={25} color={Colors.iconColor} />,
  },
  language: {
    id: 'language',
    icon: <Ionicons name="language" size={25} color={Colors.iconColor} />,
  },
  logout: {
    id: 'logout',
    icon: <AntDesign name="logout" size={20} color={Colors.iconColor} />,
  },
  verticalDots: {
    id: 'verticalDots',
    icon: <MaterialCommunityIcons name="dots-vertical" size={20} color={Colors.iconColor} />,
  },
  chat: {
    id: 'chat',
    icon: <Feather name="message-circle" size={20} color={Colors.iconColor} />,
  },
  shoppingBag: {
    id: 'shoppingBag',
    icon: <Feather name="shopping-bag" size={20} color={Colors.iconColor} />,
  },
  userPlus: {
    id: 'userPlus',
    icon: <Feather name="user-plus" size={20} color={Colors.iconColor} />,
  },
  userCheck: {
    id: 'userCheck',
    icon: <Feather name="user-check" size={20} color={Colors.iconColor} />,
  },
  plus: {
    id: 'userCheck',
    icon: <AntDesign name="plus" size={20} color={Colors.iconColor} />,
  },
};

export const sharedIcon = (...btns: any[]) => {
  return btns.map((id) => beeIconSet[id].icon)[0];
};
