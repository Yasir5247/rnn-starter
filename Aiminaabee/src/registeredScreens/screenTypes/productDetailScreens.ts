import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withRightButtons, withTitle } from '../../services/navigation/options';

import { ProductDetailScreen } from '../../screens/productDetailScreen/ProductDetailScreen';
import { ProductDescScreen } from '../../screens/productDetailScreen/ProductDescScreen';

export const productDetailScreens: Screens = [
  { name: 'ProductDetailScreen', component: ProductDetailScreen },
  { name: 'ProductDescScreen', component: ProductDescScreen },
];

export const productDetailLayouts = {
  ProductDetailScreen: {
    name: 'ProductDetailScreen',
    options: {
      topBar: {
        ...withTitle('hhh'),
        ...withRightButtons('menu'),
      },
    },
  },
  ProductDescScreen: {
    name: 'ProductDescScreen',
    options: {
      topBar: {
        ...withTitle('Description'),
      },
    },
  },
};
