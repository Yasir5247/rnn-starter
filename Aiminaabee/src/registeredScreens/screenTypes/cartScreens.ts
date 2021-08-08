import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { CartReviewScreen } from '../../screens/cartScreens/CartReviewScreen';

export const cartScreens: Screens = [{ name: 'CartReviewScreen', component: CartReviewScreen }];

export const cartScreenLayouts = {
  CartReviewScreen: {
    name: 'CartReviewScreen',
    options: {
      topBar: {
        ...withTitle('Review Cart'),
      },
    },
  },
};
