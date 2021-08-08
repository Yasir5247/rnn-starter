import { Screens, ScreensLayouts } from '../../services/navigation/types';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';

import { ImageSelectionScreen } from '../../screens/ProductCreateScreens/ImageAndShopSelectionScreen';
import { AddProductInforScreen } from '../../screens/ProductCreateScreens/AddProductInfoScreen';
//import ProductReviewAndUploadScreen from '../../screens/ProductCreateScreens/screens/3-ProductReviewAndUploadScreen';

export const prodCreateScreens: Screens = [
  { name: 'ImageSelectionScreen', component: ImageSelectionScreen },
  { name: 'AddProductInforScreen', component: AddProductInforScreen },
  // { name: 'ProductUploadReviewScreen', component: ProductReviewAndUploadScreen },
];

export const prodCreateScreenLayouts = {
  ImageSelectionScreen: {
    name: 'ImageSelectionScreen',
    options: {
      topBar: {
        ...withTitle('Select Images'),
      },
    },
  },
  AddProductInforScreen: {
    name: 'AddProductInforScreen',
    options: {
      topBar: {
        ...withTitle('Product Information'),
        ...withRightButtons('next'),
      },
    },
  },
  // ProductUploadReviewScreen: {
  //   name: 'ProductUploadReviewScreen',
  //   options: {
  //     topBar: {
  //       ...withTitle('Product Review'),
  //       ...withRightButtons('cancel'),
  //     },
  //   },
  // },
};
