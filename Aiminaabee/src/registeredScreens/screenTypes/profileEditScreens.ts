import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { UserNameEditScreen } from '../../screens/profileMenuScreens/editProfileScreens/UserNameEditScreen';
import { UserEmailEditScreen } from '../../screens/profileMenuScreens/editProfileScreens/UserEmailEditScreen';
import { UserDobEditScreen } from '../../screens/profileMenuScreens/editProfileScreens/UserDobEditScreen';
import { UserBioEditScreen } from '../../screens/profileMenuScreens/editProfileScreens/UserBioEditScreen';

export const profileEditScreens: Screens = [
  { name: 'UserNameEditScreen', component: UserNameEditScreen },
  { name: 'UserEmailEditScreen', component: UserEmailEditScreen },
  { name: 'UserDobEditScreen', component: UserDobEditScreen },
  { name: 'UserBioEditScreen', component: UserBioEditScreen },
];

export const profileEditScreenLayouts = {
  UserNameEditScreen: {
    name: 'UserNameEditScreen',
    options: {
      topBar: {
        ...withTitle('Edit name'),
        ...withRightButtons('cancel'),
      },
    },
  },
  UserEmailEditScreen: {
    name: 'UserEmailEditScreen',
    options: {
      topBar: {
        ...withTitle('Edit email'),
        ...withRightButtons('cancel'),
      },
    },
  },
  UserDobEditScreen: {
    name: 'UserDobEditScreen',
    options: {
      topBar: {
        ...withTitle('Edit DOB'),
        ...withRightButtons('cancel'),
      },
    },
  },
  UserBioEditScreen: {
    name: 'UserBioEditScreen',
    options: {
      topBar: {
        ...withTitle('Edit Bio'),
        ...withRightButtons('cancel'),
      },
    },
  },
};
