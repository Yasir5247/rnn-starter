import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { MainScreen } from '../../screens/authScreens/screens/main';
import { SignInScreen } from '../../screens/authScreens/screens/SignInScreen';
import { ForgotPswdScreen } from '../../screens/authScreens/screens/ForgotPswdScreen';
import { OtpScreen } from '../../screens/authScreens/screens/OtpScreen';
import { PasswordResetScreen } from '../../screens/authScreens/screens/PasswordResetScreen';

export const authScreens: Screens = [
  { name: 'MainScreen', component: MainScreen },
  { name: 'SignInScreen', component: SignInScreen },
  { name: 'ForgotPswdScreen', component: ForgotPswdScreen },
  { name: 'OtpScreen', component: OtpScreen },
  { name: 'PasswordResetScreen', component: PasswordResetScreen },
];

export const authLayouts = {
  MainScreen: {
    name: 'MainScreen',
    options: {
      topBar: {
        visible: false,
      },
    },
  },
  SignInScreen: {
    name: 'SignInScreen',
    options: {
      topBar: {
        ...withTitle('Sign In'),
      },
    },
  },
  ForgotPswdScreen: {
    name: 'ForgotPswdScreen',
    options: {
      topBar: {
        ...withTitle('Forgot Password'),
        ...withRightButtons('cancel'),
      },
    },
  },
  OtpScreen: {
    name: 'OtpScreen',
    options: {
      topBar: {
        ...withTitle('Verify OTP'),
        ...withRightButtons('cancel'),
      },
    },
  },
  PasswordResetScreen: {
    name: 'PasswordResetScreen',
    options: {
      topBar: {
        ...withTitle('Reset Password'),
        ...withRightButtons('cancel'),
      },
    },
  },
};
