import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { CommentScreen } from '../../screens/commentScreens/CommentScreen';

export const commentScreens: Screens = [{ name: 'CommentScreen', component: CommentScreen }];

export const commentScreenLayouts = {
  CommentScreen: {
    name: 'CommentScreen',
    options: {
      topBar: {
        ...withTitle('Comments'),
      },
    },
  },
};
