import { Screens, ScreensLayouts } from '../services/navigation/types';
import { authScreens, authLayouts } from './screenTypes/authScreens';
import { signUpScreens, signUpLayouts } from './screenTypes/signUpScreens';
import { tabScreens, tabScreenLayouts } from './screenTypes/tabScreens';
import { profileMenuScreens, profileMenuScreenLayouts } from './screenTypes/profileMenuScreens';
import { productDetailScreens, productDetailLayouts } from './screenTypes/productDetailScreens';
import { createShopScreens, createShopScreenLayouts } from './screenTypes/createShopScreen';
import { catScreens, catScreenLayouts } from './screenTypes/categoryScreens';
import { filterScreens, filterScreenLayouts } from './screenTypes/filterScreens';
import { lightBoxScreens, lightBoxScreenLayouts } from './screenTypes/lightBoxScreen';
import { commentScreens, commentScreenLayouts } from './screenTypes/commentScreens';
import { discoverScreens, discoverLayouts } from './screenTypes/discoverScreens';
import { shopScreens, shopScreenLayouts } from './screenTypes/shopScreens';
import { profileEditScreens, profileEditScreenLayouts } from './screenTypes/profileEditScreens';
import { shopMangScreens, shopMangScreenLayouts } from './screenTypes/shopManagementScreen';
import { orderScreens, orderScreenLayouts } from './screenTypes/orderScreens';
import { otherUserScreens, otherUserScreensLayouts } from './screenTypes/otherUserScreens';
import { prodCreateScreens, prodCreateScreenLayouts } from './screenTypes/productCreateScreens';
import { shippingScreens, shippingScreenLayouts } from './screenTypes/shippingInfoScreens';
import { cartScreens, cartScreenLayouts } from './screenTypes/cartScreens';

// Describe your screens here
export type Screen =
  | 'MainScreen'
  | 'SignInScreen'
  | 'ForgotPswdScreen'
  | 'OtpScreen'
  | 'PasswordResetScreen'
  //signup
  | 'UserNameScreen'
  | 'UserEmailScreen'
  | 'UserPasswordScreen'
  | 'UploadPictureScreen'
  | 'UserContactScreen'
  | 'SignUpOTPVerificationScreen'
  | 'SplashScreen'
  //tab
  | 'MagicScreen'
  | 'ExploreScreen'
  | 'ShoppingCartScreen'
  | 'NotificationScreen'
  | 'ProfileScreen'
  // other user profile
  | 'OtherUserProfile'
  | 'UserOwnedShops'
  //profile menu screens
  | 'FollowersScreen'
  | 'FollowingScreen'
  | 'FollowingShopScreen'
  | 'UserLikedScreen'
  | 'UserSavedScreen'
  | 'FriendsScreen'
  | 'ProfileEditScreen'
  //profile edit screens
  | 'UserNameEditScreen'
  | 'UserEmailEditScreen'
  | 'UserDobEditScreen'
  | 'UserBioEditScreen'
  //product detail screen
  | 'ProductDetailScreen'
  | 'ProductDescScreen'
  //shop create screens
  | 'ShopNameScreen'
  | 'ShopDesScreen'
  | 'ShopRelatedCategoryScreen'
  | 'ShopContactScreen'
  | 'ShopDeliveryLocationScreen'
  | 'ShopReivewAndUploadScreen'
  //category screens
  | 'AllProductsInCatScreen'
  | 'AllProductsInSubCatScreen'
  | 'CategorySummaryScreen'
  //filter screen
  | 'FilterMenuScreen'
  | 'FilterListScreen'
  //light box screen
  | 'LightBoxScreen'
  //comment screens
  | 'CommentScreen'
  //disover screens
  | 'DiscoverProductScreen'
  | 'DiscoverShopScreen'
  | 'DiscoverPeepScreen'
  //shop screens
  | 'ShopScreen'
  | 'ShopFollowerScreen'
  | 'RelatedShopScreen'
  | 'MapScreen'
  | 'ShopReviewScreen'
  | 'AddShopReviewScreen'
  //shop management
  | 'ShopEditScreen'
  | 'ManageShopScreen'
  | 'ShopInventory'
  | 'ShopPicUpdateScreen'
  | 'InviteFriendsScreen'
  | 'ShopUpdateLocScreen'
  //cart screens
  | 'CartReviewScreen'
  //shipping screens
  | 'ShippingScreen'
  | 'AddShippingAddress'
  //product create screens
  | 'ImageSelectionScreen'
  | 'AddProductInforScreen'
  //orders screens
  | 'OrderDetailScreen'
  | 'DeliveryAdressScreen'
  | 'OrderLogScreen'
  | 'ShopOrderScreen'
  | 'UserOrderScreen';

export const screens: Screens = [
  ...authScreens,
  ...signUpScreens,
  ...tabScreens,
  ...profileMenuScreens,
  ...profileEditScreens,
  ...productDetailScreens,
  ...createShopScreens,
  ...catScreens,
  ...filterScreens,
  ...lightBoxScreens,
  ...commentScreens,
  ...discoverScreens,
  ...shopScreens,
  ...shopMangScreens,
  ...orderScreens,
  ...otherUserScreens,
  ...prodCreateScreens,
  ...shippingScreens,
  ...cartScreens,
];

export const screensLayouts: ScreensLayouts = {
  ...authLayouts,
  ...signUpLayouts,
  ...tabScreenLayouts,
  ...profileMenuScreenLayouts,
  ...profileEditScreenLayouts,
  ...productDetailLayouts,
  ...createShopScreenLayouts,
  ...catScreenLayouts,
  ...filterScreenLayouts,
  ...lightBoxScreenLayouts,
  ...commentScreenLayouts,
  ...discoverLayouts,
  ...shopScreenLayouts,
  ...shopMangScreenLayouts,
  ...orderScreenLayouts,
  ...otherUserScreensLayouts,
  ...prodCreateScreenLayouts,
  ...shippingScreenLayouts,
  ...cartScreenLayouts,
};
