import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { ShopScreen } from '../../screens/shopScreens/ShopScreen';
import { ShopFollowerScreen } from '../../screens/shopScreens/ShopFolowersScreen';
import { RelatedShopScreen } from '../../screens/shopScreens/RelatedShopScreen';
import { MapScreen } from '../../screens/shopScreens/MapScreen';
import { ShopReviewScreen } from '../../screens/shopScreens/ShopReviewScreen';
import { AddShopReviewScreen } from '../../screens/shopScreens/AddShopReviewScreen';

export const shopScreens: Screens = [
  { name: 'ShopScreen', component: ShopScreen },
  { name: 'ShopFollowerScreen', component: ShopFollowerScreen },
  { name: 'RelatedShopScreen', component: RelatedShopScreen },
  { name: 'MapScreen', component: MapScreen },
  { name: 'ShopReviewScreen', component: ShopReviewScreen },
  { name: 'AddShopReviewScreen', component: AddShopReviewScreen },
];

export const shopScreenLayouts = {
  ShopScreen: {
    name: 'ShopScreen',
    options: {
      topBar: {
        ...withTitle(''),
        ...withRightButtons('menu'),
      },
    },
  },
  ShopFollowerScreen: {
    name: 'ShopFollowerScreen',
    options: {
      topBar: {
        ...withTitle('Followers'),
      },
    },
  },
  RelatedShopScreen: {
    name: 'RelatedShopScreen',
    options: {
      topBar: {
        ...withTitle('Related Shops'),
      },
    },
  },
  MapScreen: {
    name: 'MapScreen',
    options: {
      topBar: {
        ...withTitle('Location'),
      },
    },
  },
  ShopReviewScreen: {
    name: 'ShopReviewScreen',
    options: {
      topBar: {
        ...withTitle('Reviews'),
      },
    },
  },
  AddShopReviewScreen: {
    name: 'AddShopReviewScreen',
    options: {
      topBar: {
        ...withTitle('Add a review'),
      },
    },
  },
};
