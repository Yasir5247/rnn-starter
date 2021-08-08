import React from 'react';
import { View, Text } from 'react-native-ui-lib';

import { CartProductCard } from './CartProductCard';

interface CartViewProps {
  data: any;
  actions: {
    removeCartItem: (cartId: number) => void;
    incrementQty: (cartId: number, stock: number) => void;
    decrementQty: (cartId: number, stock: number) => void;
  };
}

export const CartView: React.FC<CartViewProps> = ({ data, actions }) => {
  return (
    <View flex-1 marginT-10>
      {data.map((item: any) => (
        <CartProductCard key={item.id} data={item} actions={actions} />
      ))}
    </View>
  );
};
