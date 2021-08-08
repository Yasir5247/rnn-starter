import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, ScrollView, AppState } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import { Navigation } from 'react-native-navigation';

import { useQuery, useApolloClient } from '@apollo/client';
import { GET_SHOPPING_CART } from '../../requests/shoppingCart';

//services
import { useServices } from '../../services';

//custom hooks
import { useToggleFollowShop } from '../../requests/mutations/shop';
import { useRemoveCartItem, useUpdateCartUserQty } from '../../requests/mutations/shoppingCart';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { NavigationFunctionComponent } from 'react-native-navigation';

//Components
import { CartView } from '../../components/cart/CartView';
import { LikedProductScroller } from '../../components/cart/LikedProductScroller';
import { SavedProductScroller } from '../../components/cart/SavedProductScroller';
import { CartSummaryView } from '../../components/cart/CartSummaryView';
import { PopularShops } from '../../components/cart/PopularShops';
import { BeeModal } from '../../components/comon/BeeModal';

import { INCREMENT_QUANTITY, DECREMENT_QUANTITY } from '../../constants/cartQuantityTypes';

//Max limit for shoping cart items
const LIMIT = 50;

export const ShoppingCartScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: removeCartItem } = useRemoveCartItem();
  const { mutate: updateCartUserQuantity } = useUpdateCartUserQty();
  const { mutate: toggleFollowShop } = useToggleFollowShop();

  const [hasCartChanged, setHasCartChanged] = useState(false);

  const apolloClient = useApolloClient();

  //likedModelRef
  const userLikedListModelRef: any = useRef(null);
  const userSavedListModelRef: any = useRef(null);
  const shoppingCartRef: any = useRef(null);
  const hasCartChangedRef: any = useRef(hasCartChanged);

  //shoping cart items
  const { loading, data } = useQuery(GET_SHOPPING_CART, {
    variables: { limit: LIMIT, offset: 0 },
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    // console.log({ hasCartChanged });
  }, [hasCartChanged]);

  //Button handler
  useNavigationButtonPress(() => userSavedListModelRef.current.open(), componentId, 'bookmark');
  useNavigationButtonPress(() => userLikedListModelRef.current.open(), componentId, 'heart');

  useEffect(() => {
    let cartCount = data?.shoppingCart.length;
    Navigation.mergeOptions(componentId, {
      bottomTab: {
        badge: cartCount ? cartCount.toString() : '',
      },
    });
    shoppingCartRef.current = data?.shoppingCart;
  }, [componentId, data?.shoppingCart]);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    const screenEventListener = Navigation.events().registerComponentDidDisappearListener(
      ({ componentId }) => {
        if (componentId === 'SHOPPING_CART_TAB') {
          if (hasCartChangedRef.current) {
            handleUpdateCartQuantity();
          }
        }
      },
    );
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      screenEventListener.remove();
    };
  }, [componentId]);

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState !== 'active' && nextAppState !== 'inactive') {
      if (hasCartChangedRef.current) {
        handleUpdateCartQuantity();
      }
    }
  };

  const handleUpdateCartQuantity = () => {
    const cartData = shoppingCartRef.current.map((cartItem: any) => ({
      productId: cartItem.product.id,
      userQty: cartItem.userQty,
    }));
    updateCartUserQuantity({ variables: { input: cartData } });
  };

  const updateQuantity = (type: any, cartItemId: any, stock: any) => {
    const { shoppingCart }: any = apolloClient.readQuery({
      query: GET_SHOPPING_CART,
    });
    const itemIndex = shoppingCart.findIndex((obj: any) => obj.id === cartItemId);
    let newCart = [...shoppingCart];
    switch (type) {
      case INCREMENT_QUANTITY:
        if (newCart[itemIndex].userQty < stock)
          newCart[itemIndex] = {
            ...newCart[itemIndex],
            userQty: newCart[itemIndex].userQty + 1,
          };
        break;
      case DECREMENT_QUANTITY:
        if (newCart[itemIndex].userQty > 1) {
          newCart[itemIndex] = {
            ...newCart[itemIndex],
            userQty: newCart[itemIndex].userQty - 1,
          };
        }
        break;
      default:
        break;
    }
    if (newCart[itemIndex].userQty !== shoppingCart[itemIndex].userQty) {
      setHasCartChanged(true);
      hasCartChangedRef.current = true;
      apolloClient.writeQuery({
        query: GET_SHOPPING_CART,
        data: {
          shoppingCart: newCart,
        },
      });
    }
  };

  if (loading) {
    <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View flex-1 padding-10 bg-white>
      {data?.shoppingCart.length ? (
        <ScrollView contentInsetAdjustmentBehavior="always" showsVerticalScrollIndicator={false}>
          <CartView
            data={data?.shoppingCart ?? []}
            actions={{
              removeCartItem: (cartId: number) => removeCartItem({ variables: { cartId } }),
              incrementQty: (cartId: number, stock: number) =>
                updateQuantity(INCREMENT_QUANTITY, cartId, stock),
              decrementQty: (cartId: number, stock: number) =>
                updateQuantity(DECREMENT_QUANTITY, cartId, stock),
            }}
          />
          <CartSummaryView
            data={{
              subTotal: data.cartSummary.subTotal,
              totTaxPrice: data.cartSummary.totTaxPrice,
              totalPrice: data.cartSummary.finalPrice,
              screen: 'shoppingCartScreen',
            }}
            actions={{
              proceedHanlder: () =>
                nav.push(componentId, 'ShippingScreen', {
                  screen: 'shoppingCartScreen',
                }),
            }}
          />
        </ScrollView>
      ) : (
        <PopularShops
          actions={{
            toggleFollowShop: (shopId: number, status: any) =>
              toggleFollowShop({ variables: { shopId, status } }),
          }}
        />
      )}
      <BeeModal heading={'From Liked'} modalRef={userLikedListModelRef} modalHeight={365}>
        <LikedProductScroller />
      </BeeModal>
      <BeeModal heading={'From Saved'} modalRef={userSavedListModelRef} modalHeight={365}>
        <SavedProductScroller />
      </BeeModal>
    </View>
  );
};
