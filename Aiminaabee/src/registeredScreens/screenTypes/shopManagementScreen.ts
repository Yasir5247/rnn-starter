import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { ManageShopScreen } from '../../screens/shopManagement/ManageShopScreen';
import { ShopEditScreen } from '../../screens/shopManagement/ShopEditScreen';
import { ShopInventory } from '../../screens/shopManagement/InventoryScreen';
import { ShopPicUpdateScreen } from '../../screens/shopManagement/ShopPictureUpdateScreen';
import { InviteFriendsScreen } from '../../screens/shopManagement/InviteFriendsScreen';
import { ShopUpdateLocScreen } from '../../screens/shopManagement/ShopUpdateLocScreen';
// import ShopVerifyScreen from '../../screens/ShopManagment/Screens/ShopVerifyScreen';
// import MobileShopVerification from '../../screens/ShopManagment/Screens/MobileVerificationScreen';

export const shopMangScreens: Screens = [
  { name: 'ManageShopScreen', component: ManageShopScreen },
  { name: 'ShopEditScreen', component: ShopEditScreen },
  { name: 'ShopInventory', component: ShopInventory },
  { name: 'ShopPicUpdateScreen', component: ShopPicUpdateScreen },
  { name: 'InviteFriendsScreen', component: InviteFriendsScreen },
  { name: 'ShopUpdateLocScreen', component: ShopUpdateLocScreen },
  // { name: 'ShopVerifyScreen', component: ShopVerifyScreen },
  // { name: 'MobileShopVerification', component: MobileShopVerification },
];

export const shopMangScreenLayouts = {
  ManageShopScreen: {
    name: 'ManageShopScreen',
    options: {
      topBar: {
        ...withTitle(''),
      },
    },
  },
  ShopEditScreen: {
    name: 'ShopEditScreen',
    options: {
      topBar: {
        ...withTitle('Edit Shop'),
        ...withRightButtons('cancel'),
      },
    },
  },
  ShopInventory: {
    name: 'ShopInventory',
    options: {
      topBar: {
        ...withTitle('Inventory'),
      },
    },
  },
  ShopPicUpdateScreen: {
    name: 'ShopPicUpdateScreen',
    options: {
      topBar: {
        ...withTitle('Update Picture'),
      },
    },
  },
  InviteFriendsScreen: {
    name: 'InviteFriendsScreen',
    options: {
      topBar: {
        ...withTitle('Invite Friends'),
      },
    },
  },
  ShopUpdateLocScreen: {
    name: 'ShopUpdateLocScreen',
    options: {
      topBar: {
        ...withTitle('Edit Shop Location'),
      },
    },
  },
  // ShopVerifyScreen: {
  //   name: 'ShopVerifyScreen',
  //   options: {
  //     topBar: {
  //       ...withTitle('Shop Verification'),
  //     },
  //   },
  // },
  // MobileShopVerification: {
  //   name: 'MobileShopVerification',
  //   options: {
  //     topBar: {
  //       ...withTitle('Mobile Shop Verification'),
  //     },
  //   },
  // },
};
