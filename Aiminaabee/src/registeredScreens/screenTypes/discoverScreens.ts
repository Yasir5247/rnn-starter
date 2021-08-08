import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { DiscoverProducts } from '../../screens/discoverScreens/DiscoverProducts';
import { DiscoverShops } from '../../screens/discoverScreens/DiscoverShops';
import { DiscoverPeeps } from '../../screens/discoverScreens/DiscoverPeeps';

export const discoverScreens: Screens = [
  //Auth
  { name: 'DiscoverProductScreen', component: DiscoverProducts },
  { name: 'DiscoverShopScreen', component: DiscoverShops },
  { name: 'DiscoverPeepScreen', component: DiscoverPeeps },
];

export const discoverLayouts = {
  //Auth
  DiscoverProductScreen: {
    name: 'DiscoverProductScreen',
    options: {
      topBar: {
        ...withTitle('Search Products'),
      },
    },
  },
  DiscoverShopScreen: {
    name: 'DiscoverShopScreen',
    options: {
      topBar: {
        ...withTitle('Search Shops'),
      },
    },
  },
  DiscoverPeepScreen: {
    name: 'DiscoverPeepScreen',
    options: {
      topBar: {
        ...withTitle('Search Users'),
      },
    },
  },
};
