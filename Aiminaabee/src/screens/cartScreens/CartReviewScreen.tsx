import React, { useRef } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import Modal from 'react-native-modalbox';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_SHOPPING_CART } from '../../requests/shoppingCart';

//services
import { useServices } from '../../services';

//custom hooks
import { usePlaceOrder, usePlaceOrderNotification } from '../../requests/mutations/order';

//components
import { ImageLoader } from '../../components/comon/ImageLoader';
import { CartSummaryView } from '../../components/cart/CartSummaryView';
import { DefaultShippingAdress } from '../../components/cart/DefaultShippingAdress';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//custom hooks
import { useProcessOrders } from '../../hooks/useProcessOrders';

const LIMIT = 20;

export const CartReviewScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: placeOrder } = usePlaceOrder();
  const { mutate: placeOrderNotification } = usePlaceOrderNotification();
  const { getOrderPayload } = useProcessOrders();

  //References
  const orderPlaceRefrenceModal = useRef<any>(null);

  //Button press
  useNavigationButtonPress(() => nav.popToRoot(componentId), componentId, 'cancel');

  //Shopping cart query
  const { loading, data, networkStatus, refetch } = useQuery(GET_SHOPPING_CART, {
    variables: { limit: LIMIT, offset: 0 },
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  const _orderHandler = async () => {
    //Set loading state
    orderPlaceRefrenceModal.current.open();

    //Modifiy cart details and appeneded with required information
    const orderPayload = getOrderPayload(data.shoppingCart);

    try {
      // place order
      const order = await placeOrder({ variables: { order: orderPayload } });
      const orderResponse = order.data.placeOrder.orders;

      // remove __typname and format the response
      const items = orderResponse.map((x: any) => {
        return {
          id: x.id,
          shopId: x.shopId,
          userId: x.userId,
          products: [
            ...x.products.map((x: any) => {
              return {
                id: x.id,
                name: x.name,
                defaultImage: x.defaultImage,
              };
            }),
          ],
        };
      });

      // send Notification
      await placeOrderNotification({ variables: { order: items } });

      // end loading state
      orderPlaceRefrenceModal.current.close();

      // go back to shopping cart screen
      nav.popToRoot(componentId);
    } catch (err) {
      console.log('error', err);
      console.log('err3', Object.values(err));
      //End loading state
      orderPlaceRefrenceModal.current.close();
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() => refetch({ limit: LIMIT, offset: 0 })}
            colors={['#EA0000']}
            tintColor="#000"
            title="loading..."
            titleColor="#000"
            progressBackgroundColor="white"
          />
        }>
        <View style={styles.detailsWrapper}>
          {data?.shoppingCart.length
            ? data?.shoppingCart.map((x: any) => (
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.imageBox}>
                    <ImageLoader
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: '#fbfcfb',
                      }}
                      imageStyle={{ borderRadius: 100 }}
                      source={{ uri: x.product.avatar }}
                    />
                  </View>
                  <View style={{ flex: 1, paddingLeft: 8, justifyContent: 'center' }}>
                    <Text style={{ color: '#fff' }}>{x.product.formatedName}</Text>
                    <Text style={{ color: '#fff' }}>
                      {x.product.price} x {x.userQty}{' '}
                    </Text>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
                      {x.subTotal}
                    </Text>
                  </View>
                </View>
              ))
            : null}
        </View>
        <CartSummaryView
          data={{
            subTotal: data.cartSummary.subTotal,
            totTaxPrice: data.cartSummary.totTaxPrice,
            totalPrice: data.cartSummary.finalPrice,
            screen: '',
          }}
          actions={{ proceedHanlder: () => null }}
        />
        <DefaultShippingAdress />
        <View style={{ height: 40 }}>
          <Button
            bg-btnBg
            br20
            label={t.do('section.appWideButtons.button.proceed')}
            onPress={() => _orderHandler()}
          />
        </View>
      </ScrollView>
      <Modal
        style={styles.modal}
        backdrop={true}
        backdropPressToClose={false}
        position={'center'}
        ref={orderPlaceRefrenceModal}>
        <View style={styles.innerModalBox}>
          <View>
            <Text style={{ color: '#000' }}>Uploading...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

CartReviewScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  detailsWrapper: {
    padding: 10,
    backgroundColor: '#23272A',
    borderRadius: 12,
  },
  imageBox: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  orderButton: {
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#0062FF',
  },
  modal: {
    justifyContent: 'flex-start',
    backgroundColor: '#2C2F33',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 4,
  },
  innerModalBox: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 150,
    width: 150,
  },
});
