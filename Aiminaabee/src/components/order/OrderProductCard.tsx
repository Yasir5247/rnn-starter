import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';

//components
import { ImageLoader } from '../comon/ImageLoader';

//types
import { ShopOrders_shopOrders_order_product } from '../../requests/__generated__/ShopOrders';

//icons
import { sharedIcon } from '../../utils/icons';
import { UserOrders_userOrders_order_product } from '../../requests/__generated__/UserOrders';
import { OrderDetail_orderDetail_order_product } from '../../requests/__generated__/OrderDetail';

interface OrderProductCardProps {
  data: {
    products:
      | ShopOrders_shopOrders_order_product[]
      | UserOrders_userOrders_order_product[]
      | OrderDetail_orderDetail_order_product[];
    orderStatus: string;
  };
  actions: {
    makeFeedBack: (productId: number, productName: string, productImage: string) => void;
  };
}

export const OrderProductCard: React.FC<OrderProductCardProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      {data.products.map((x: ShopOrders_shopOrders_order_product) => (
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.imageBox}>
            <ImageLoader
              style={styles.imageStyle}
              imageStyle={{ borderRadius: 100 }}
              source={{ uri: x.defaultImage }}
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 8, justifyContent: 'center' }}>
            <Text style={{ color: '#fff' }}>{x.formatedName}</Text>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
              {x.price} x {x.orderQty} = {x.formatedTotalPrice}
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            {data.orderStatus === 'Delivered' ? (
              <TouchableWithoutFeedback
                onPress={() => actions.makeFeedBack(x.id, x.name, x.defaultImage)}>
                <View style={styles.feedBackButton}>
                  <Text style={{ color: '#fff' }}>FeedBack</Text>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <View>
                <Text>{sharedIcon('info')}</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#23272A',
    borderRadius: 8,
    marginTop: 10,
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
  feedBackButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
