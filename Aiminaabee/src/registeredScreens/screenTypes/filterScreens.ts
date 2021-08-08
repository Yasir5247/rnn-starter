import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { FilterMenuScreen } from '../../screens/filterScreens/FilterMenuScreen';
import { FilterListScreen } from '../../screens/filterScreens/FilterListScreen';

export const filterScreens: Screens = [
  { name: 'FilterMenuScreen', component: FilterMenuScreen },
  { name: 'FilterListScreen', component: FilterListScreen },
];

export const filterScreenLayouts = {
  FilterMenuScreen: {
    name: 'FilterMenuScreen',
    options: {
      topBar: {
        ...withTitle('Filter'),
      },
    },
  },
  FilterListScreen: {
    name: 'FilterListScreen',
    options: {
      topBar: {
        ...withTitle(''),
      },
    },
  },
};
