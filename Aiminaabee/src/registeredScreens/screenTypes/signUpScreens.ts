import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withRightButtons, withTitle } from '../../services/navigation/options';

import { UserNameScreen } from '../../screens/emailSignUp/UserNameScreen';
import { UserEmailScreen } from '../../screens/emailSignUp/UserEmailScreen';
import { UserPasswordScreen } from '../../screens/emailSignUp/UserPaswdScreen';
import { UploadPictureScreen } from '../../screens/emailSignUp/UploadPictureScreen';
import { UserContactScreen } from '../../screens/emailSignUp/UserContactScreen';
import { SignUpOTPVerificationScreen } from '../../screens/emailSignUp/UserOTPVerificationScreen';
import { SplashScreen } from '../../screens/emailSignUp/SignUpSplashScreen';


export const signUpScreens: Screens = [
   { name: 'UserNameScreen', component: UserNameScreen },
   { name: 'UserEmailScreen', component: UserEmailScreen },
   { name: 'UserPasswordScreen', component: UserPasswordScreen },
   { name: 'UploadPictureScreen', component: UploadPictureScreen },
   { name: 'UserContactScreen', component: UserContactScreen },
   { name: 'SignUpOTPVerificationScreen', component: SignUpOTPVerificationScreen },
   { name: 'SplashScreen', component: SplashScreen },
];


export const signUpLayouts = {
   UserNameScreen: {
      name: 'UserNameScreen',
      options: {
         topBar: {
            ...withTitle('Your name?'),
            ...withRightButtons('next')
         },
      },
   },
   UserEmailScreen: {
      name: 'UserEmailScreen',
      options: {
         topBar: {
            ...withTitle('Your email'),
            ...withRightButtons('next')
         },
      },
   },
   UserPasswordScreen: {
      name: 'UserPasswordScreen',
      options: {
         topBar: {
            ...withTitle('Your secret'),
            ...withRightButtons('next')
         },
      },
   },
   UploadPictureScreen: {
      name: 'UploadPictureScreen',
      options: {
         topBar: {
            ...withTitle('Your Picture'),
            ...withRightButtons('next')
         },
      },
   },
   UserContactScreen: {
      name: 'UserContactScreen',
      options: {
         topBar: {
            ...withTitle('Your Contact'),
            ...withRightButtons('next')
         },
      },
   },
   SignUpOTPVerificationScreen: {
      name: 'SignUpOTPVerificationScreen',
      options: {
         topBar: {
            ...withTitle('Verify OTP')
         },
      },
   },
   SplashScreen: {
      name: 'SplashScreen',
      options: {
         topBar: {
            ...withTitle('Let\'s get you in'),
            ...withRightButtons('cancel'),
         },
      },
   }
};