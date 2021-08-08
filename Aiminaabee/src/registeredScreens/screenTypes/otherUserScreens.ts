import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { OtherUserProfile } from '../../screens/otherUserScreens/OtherUserProfile';
import { UserOwnedShops } from '../../screens/otherUserScreens/UserOwnedShops';

export const otherUserScreens: Screens = [
  { name: 'OtherUserProfile', component: OtherUserProfile },
  { name: 'UserOwnedShops', component: UserOwnedShops },
];

export const otherUserScreensLayouts = {
  OtherUserProfile: {
    name: 'OtherUserProfile',
    options: {
      topBar: {
        ...withTitle('profile'),
      },
    },
  },
  UserOwnedShops: {
    name: 'UserOwnedShops',
    options: {
      topBar: {
        ...withTitle('shops'),
      },
    },
  },
};
