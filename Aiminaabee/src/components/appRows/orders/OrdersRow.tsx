import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';

//types
import { ShopOrders_shopOrders_order } from '../../../requests/__generated__/ShopOrders';
import { UserOrders_userOrders_order } from '../../../requests/__generated__/UserOrders';

//components
import { OrderProductCard } from '../../../components/order/OrderProductCard';

interface OrdersRowProps {
  data: ShopOrders_shopOrders_order | UserOrders_userOrders_order;
  actions: {
    onPressOrderDetail: (orderId: number) => void;
    makeFeedBack: (productId: number, productName: string, productImage: string) => void;
  };
}

export const OrdersRow: React.FC<OrdersRowProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInformationBox}>
          <Text style={styles.statusText}>Order ID: {data.id}</Text>
          <Text style={styles.statusText}>Shop: {data.shop.name}</Text>
        </View>
        <View style={styles.orderStatusBox}>
          <Text style={styles.statusText}>{data.status}</Text>
        </View>
      </View>
      <OrderProductCard
        data={{
          products: data.product,
          orderStatus: data.status,
        }}
        actions={actions}
      />
      <View style={styles.orderButtonContainer}>
        <View style={styles.buttonTwo}>
          <TouchableWithoutFeedback onPress={() => actions.onPressOrderDetail(data.id)}>
            <View style={styles.orderDetailButton}>
              <Text>Order Detail</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    // borderWidth: 1, borderColor: 'red',
  },
  orderHeader: {
    flexDirection: 'row',
    padding: 5,
    // borderWidth: 1, borderColor: '#000',
  },
  orderInformationBox: {
    flex: 1,
    // borderWidth: 1, borderColor: '#000',
  },
  orderStatusBox: {
    justifyContent: 'center',
    // borderWidth: 1, borderColor: '#000',
  },
  orderProductsContainer: {
    padding: 10,
    backgroundColor: '#23272A',
    borderRadius: 8,
  },
  imageBox: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fbfcfb',
  },
  orderButtonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    height: 60,
    // borderWidth: 1, borderColor: '#000'
  },
  buttonOne: {
    flex: 1,
    // borderWidth: 1, borderColor: '#000'
  },
  buttonTwo: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  orderDetailButton: {
    // borderWidth: 1, borderColor: '#000',
  },
  statusText: {
    fontSize: 14,
    color: '#000',
  },
});
