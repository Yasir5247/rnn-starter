import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { ShippingScreen } from '../../screens/shippingInfoScreens/ShippingScreen';
import { AddShippingAddress } from '../../screens/shippingInfoScreens/AddShippingAdress';

export const shippingScreens: Screens = [
  { name: 'ShippingScreen', component: ShippingScreen },
  { name: 'AddShippingAddress', component: AddShippingAddress },
];

export const shippingScreenLayouts = {
  ShippingScreen: {
    name: 'ShippingScreen',
    options: {
      topBar: {
        ...withTitle('Shipping Info'),
        ...withRightButtons('addIcon'),
      },
    },
  },
  AddShippingAddress: {
    name: 'AddShippingAddress',
    options: {
      topBar: {
        ...withTitle('Add Shipping Address'),
        ...withRightButtons('cancel'),
      },
    },
  },
};
