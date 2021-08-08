import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { FollowersScreen } from '../../screens/profileMenuScreens/FollowersScreen';
import { FollowingScreen } from '../../screens/profileMenuScreens/FollowingScreen';
import { FollowingShopScreen } from '../../screens/profileMenuScreens/FollowingShopsScreen';
import { UserLikedScreen } from '../../screens/profileMenuScreens/UserLikesScreen';
import { UserSavedScreen } from '../../screens/profileMenuScreens/UserSavesScreens';
import { FriendsScreen } from '../../screens/profileMenuScreens/FriendsScreen';
import { ProfileEditScreen } from '../../screens/profileMenuScreens/ProfileEditScreen';
// import ProfileAllShopScreen from '../../screens/profileMenuScreens/ProfileAllShops';

export const profileMenuScreens: Screens = [
  { name: 'FollowersScreen', component: FollowersScreen },
  { name: 'FollowingScreen', component: FollowingScreen },
  { name: 'FollowingShopScreen', component: FollowingShopScreen },
  { name: 'UserLikedScreen', component: UserLikedScreen },
  { name: 'UserSavedScreen', component: UserSavedScreen },
  { name: 'FriendsScreen', component: FriendsScreen },
  { name: 'ProfileEditScreen', component: ProfileEditScreen },
  // { name: 'ProfileAllShopScreen', component: ProfileAllShopScreen },
];

export const profileMenuScreenLayouts = {
  FollowersScreen: {
    name: 'FollowersScreen',
    options: {
      topBar: {
        ...withTitle('Followers'),
      },
    },
  },
  FollowingScreen: {
    name: 'FollowingScreen',
    options: {
      topBar: {
        ...withTitle('Following'),
      },
    },
  },
  FollowingShopScreen: {
    name: 'FollowingShopScreen',
    options: {
      topBar: {
        ...withTitle('Following Shops'),
      },
    },
  },
  UserLikedScreen: {
    name: 'UserLikedScreen',
    options: {
      topBar: {
        ...withTitle('Likes'),
      },
    },
  },
  UserSavedScreen: {
    name: 'UserSavedScreen',
    options: {
      topBar: {
        ...withTitle('Saves'),
      },
    },
  },
  FriendsScreen: {
    name: 'FriendsScreen',
    options: {
      topBar: {
        ...withTitle('Friends'),
      },
    },
  },
  ProfileEditScreen: {
    name: 'ProfileEditScreen',
    options: {
      topBar: {
        ...withTitle('Edit Profile'),
      },
    },
  },
};
