import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { ShopOrderScreen } from '../../screens/orderScreens/ShopOrderScreen';
import { UserOrderScreen } from '../../screens/orderScreens/UserOrdersScreen';
import { OrderDetailScreen } from '../../screens/orderScreens/OrderDetailScreen';
import { DeliveryAdressScreen } from '../../screens/orderScreens/DeliveryAdressScreen';
import { OrderLogScreen } from '../../screens/orderScreens/OrderLogScreen';
// import OrderFeedBackScreen from '../../screens/orderScreens/OrderFeedBackScreen';

export const orderScreens: Screens = [
  { name: 'ShopOrderScreen', component: ShopOrderScreen },
  { name: 'UserOrderScreen', component: UserOrderScreen },
  { name: 'OrderDetailScreen', component: OrderDetailScreen },
  { name: 'DeliveryAdressScreen', component: DeliveryAdressScreen },
  { name: 'OrderLogScreen', component: OrderLogScreen },
  // { name: 'OrderFeedBackScreen', component: OrderFeedBackScreen },
];

export const orderScreenLayouts = {
  ShopOrderScreen: {
    name: 'ShopOrderScreen',
    options: {
      topBar: {
        ...withTitle('Your Orders'),
        ...withRightButtons('filter'),
      },
    },
  },
  UserOrderScreen: {
    name: 'UserOrderScreen',
    options: {
      topBar: {
        ...withTitle('Your Orders'),
        ...withRightButtons('filter'),
      },
    },
  },
  OrderDetailScreen: {
    name: 'OrderDetailScreen',
    options: {
      topBar: {
        ...withTitle('Order Detail'),
      },
    },
  },
  DeliveryAdressScreen: {
    name: 'DeliveryAdressScreen',
    options: {
      topBar: {
        ...withTitle('Delivery Address'),
      },
    },
  },
  OrderLogScreen: {
    name: 'OrderLogScreen',
    options: {
      topBar: {
        ...withTitle('Order Logs'),
      },
    },
  },
  // OrderFeedBackScreen: {
  //   name: 'OrderFeedBackScreen',
  //   options: {
  //     topBar: {
  //       ...withTitle('Feedback'),
  //     },
  //   },
  // },
};
