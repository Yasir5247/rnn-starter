import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import { ImageLoader } from '../comon/ImageLoader';
import { QtyButton } from './QtyButton';

import Icon from 'react-native-vector-icons/Feather';
const removeIcon = <Icon name="x" size={30} color="#fff" />;

interface CartProductCardProps {
  data: {
    id: number;
    userQty: number;
    product: {
      name: string;
      price: string;
      avatar: string;
      stock: number;
    };
  };
  actions: {
    removeCartItem: (cartId: number) => void;
    incrementQty: (cartId: number, stock: number) => void;
    decrementQty: (cartId: number, stock: number) => void;
  };
}

export const CartProductCard: React.FC<CartProductCardProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.left, styles.centerStyle]}>
        <ImageLoader
          style={{ width: 40, height: 40 }}
          imageStyle={{ borderRadius: 100 }}
          source={{ uri: data.product.avatar }}
        />
      </View>
      <View style={[styles.right, styles.centerStyle]}>
        <View style={{ width: '50%' }}>
          <Text style={{ color: '#ccc', fontSize: 14 }}>{data.product.name}</Text>
          <Text style={{ color: '#ccc', fontSize: 12 }}>{data.product.price}</Text>
          <Text style={{ color: '#ccc', fontSize: 12 }}>Qty {data.product.stock}</Text>
        </View>
        <View style={{ width: '45%' }}>
          <QtyButton
            data={{
              cartId: data.id,
              userQty: data.userQty,
              stock: data.product.stock,
            }}
            actions={{
              ...actions,
            }}
          />
        </View>
        <View style={{ width: '15%' }}>
          <TouchableWithoutFeedback onPress={() => actions.removeCartItem(data.id)}>
            <Text>{removeIcon}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 5,
    backgroundColor: '#23272A',
  },
  left: {
    width: '20%',
    // borderWidth: 1, borderColor: '#fff'
  },
  right: {
    width: '80%',
    padding: 15,
    flexDirection: 'row',
    // borderWidth: 1, borderColor: '#fff'
  },
  centerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
