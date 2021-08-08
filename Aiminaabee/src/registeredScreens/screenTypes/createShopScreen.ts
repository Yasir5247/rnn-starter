import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { ShopNameScreen } from '../../screens/shopCreateScreens/1-ShopNameScreen';
import { ShopDesScreen } from '../../screens/shopCreateScreens/2-ShopDescScreen';
import { ShopRelatedCategoryScreen } from '../../screens/shopCreateScreens/3-ShopRelatedCategoryScreen';
import { ShopContactScreen } from '../../screens/shopCreateScreens/4-ShopContactScreen';
import { ShopDeliveryLocationScreen } from '../../screens/shopCreateScreens/6-ShopDeliveryLocationScreen';
import { ShopReivewAndUploadScreen } from '../../screens/shopCreateScreens/8-ShopReviewAndUploadScreen';

export const createShopScreens: Screens = [
  { name: 'ShopNameScreen', component: ShopNameScreen },
  { name: 'ShopDesScreen', component: ShopDesScreen },
  { name: 'ShopRelatedCategoryScreen', component: ShopRelatedCategoryScreen },
  { name: 'ShopContactScreen', component: ShopContactScreen },
  { name: 'ShopDeliveryLocationScreen', component: ShopDeliveryLocationScreen },
  { name: 'ShopReivewAndUploadScreen', component: ShopReivewAndUploadScreen },
];

export const createShopScreenLayouts = {
  ShopNameScreen: {
    name: 'ShopNameScreen',
    options: {
      topBar: {
        ...withTitle('Shop name?'),
        ...withRightButtons('next'),
      },
    },
  },
  ShopDesScreen: {
    name: 'ShopDesScreen',
    options: {
      topBar: {
        ...withTitle('Shop description?'),
        ...withRightButtons('next'),
      },
    },
  },
  ShopRelatedCategoryScreen: {
    name: 'ShopRelatedCategoryScreen',
    options: {
      topBar: {
        ...withTitle('Which Category?'),
        ...withRightButtons('next'),
      },
    },
  },
  ShopContactScreen: {
    name: 'ShopContactScreen',
    options: {
      topBar: {
        ...withTitle('Shop Contact Number?'),
        ...withRightButtons('next'),
      },
    },
  },
  ShopDeliveryLocationScreen: {
    name: 'ShopDeliveryLocationScreen',
    options: {
      topBar: {
        ...withTitle('Delivery Locations?'),
        ...withRightButtons('next'),
      },
    },
  },
  ShopReivewAndUploadScreen: {
    name: 'ShopReivewAndUploadScreen',
    options: {
      topBar: {
        ...withTitle('Review and Upload'),
        ...withRightButtons('cancel'),
      },
    },
  },
};
