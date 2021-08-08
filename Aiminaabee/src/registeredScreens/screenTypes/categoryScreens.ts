import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { AllProductsInCatScreen } from '../../screens/categoryScreens/allProductsInCatScreen';
import { AllProductsInSubCatScreen } from '../../screens/categoryScreens/allProductsInSubCatScreen';
import { CategorySummaryScreen } from '../../screens/categoryScreens/CategorySummaryScreen';

export const catScreens: Screens = [
  { name: 'AllProductsInCatScreen', component: AllProductsInCatScreen },
  { name: 'AllProductsInSubCatScreen', component: AllProductsInSubCatScreen },
  { name: 'CategorySummaryScreen', component: CategorySummaryScreen },
];

export const catScreenLayouts = {
  AllProductsInCatScreen: {
    name: 'AllProductsInCatScreen',
    options: {
      topBar: {
        ...withRightButtons('search'),
      },
    },
  },
  AllProductsInSubCatScreen: {
    name: 'AllProductsInSubCatScreen',
    options: {
      topBar: {
        ...withRightButtons('search'),
      },
    },
  },
  CategorySummaryScreen: {
    name: 'CategorySummaryScreen',
    options: {
      topBar: {
        ...withRightButtons('search'),
      },
    },
  },
};
