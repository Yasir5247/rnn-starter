import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { LightBoxScreen } from '../../screens/lightBoxScreen/LightboxScreen';

export const lightBoxScreens: Screens = [{ name: 'LightBoxScreen', component: LightBoxScreen }];

export const lightBoxScreenLayouts = {
  LightBoxScreen: {
    name: 'LightBoxScreen',
    options: {
      topBar: {
        ...withTitle('Picture'),
      },
    },
  },
};
