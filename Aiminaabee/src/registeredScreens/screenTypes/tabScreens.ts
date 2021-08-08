import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withLeftButtons, withRightButtons, withTitle } from '../../services/navigation/options';
import { TabIcons } from '../../assets/customIcons';

//Tab Screens
import { MagicScreen } from '../../screens/tabScreens/MagicScreen';
import { ExploreScreen } from '../../screens/tabScreens/ExploreScreen';
import { ShoppingCartScreen } from '../../screens/tabScreens/ShopingCartScreen';
import { NotificationScreen } from '../../screens/tabScreens/NotificationScreen';
import { ProfileScreen } from '../../screens/tabScreens/ProfileScreen';



export const tabScreens: Screens = [
   //Tabs
   { name: 'MagicScreen', component: MagicScreen },
   { name: 'ExploreScreen', component: ExploreScreen },
   { name: 'ShoppingCartScreen', component: ShoppingCartScreen },
   { name: 'NotificationScreen', component: NotificationScreen },
   { name: 'ProfileScreen', component: ProfileScreen },
];


export const tabScreenLayouts = {
   //Tabs
   MagicScreen: {
      name: 'MagicScreen',
      options: {
         topBar: {
            ...withTitle('Aiminaabee'),
            ...withRightButtons('search'),
            ...withLeftButtons('message')
         },
         ...withBottomTab('magic',
            TabIcons.magicIcon,
            TabIcons.magicSelectedIcon
         ),
      },
   },
   ExploreScreen: {
      name: 'ExploreScreen',
      options: {
         topBar: {
            ...withTitle('Explore'),
            ...withRightButtons('shops'),
            ...withLeftButtons('users')
         },
         ...withBottomTab('explore',
            TabIcons.exploreIcon,
            TabIcons.exploreSelectedIcon
         ),
      },
   },
   ShoppingCartScreen: {
      name: 'ShoppingCartScreen',
      options: {
         topBar: {
            ...withTitle('Cart'),
            ...withRightButtons('heart'),
            ...withLeftButtons('bookmark')
         },
         ...withBottomTab('cart',
            TabIcons.cartIcon,
            TabIcons.cartSelectedIcon
         ),
      },
   },
   NotificationScreen: {
      name: 'NotificationScreen',
      options: {
         topBar: {
            visible: false,
         },
         ...withBottomTab('notification',
            TabIcons.notificationIcon,
            TabIcons.notificationSelectedIcon
         ),
      },
   },
   ProfileScreen: {
      name: 'ProfileScreen',
      options: {
         topBar: {
            ...withTitle('Profile'),
            ...withRightButtons('addIcon'),
         },
         ...withBottomTab('profile',
            TabIcons.userIcon,
            TabIcons.userSelectedIcon
         ),
      },
   },
};
