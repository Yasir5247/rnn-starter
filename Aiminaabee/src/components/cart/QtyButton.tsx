import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="pluscircleo" size={30} color="#fff" />;
const minusIcon = <Icon name="minuscircleo" size={30} color="#fff" />;

interface QtyButtonProps {
  data: {
    cartId: number;
    userQty: number;
    stock: number;
  };
  actions: {
    incrementQty: (cartId: number, stock: number) => void;
    decrementQty: (cartId: number, stock: number) => void;
  };
}

export const QtyButton: React.FC<QtyButtonProps> = ({ data, actions }) => {
  return (
    <View flex-1 center row style={{ justifyContent: 'space-evenly' }}>
      <View>
        <TouchableWithoutFeedback onPress={() => actions.decrementQty(data.cartId, data.stock)}>
          {minusIcon}
        </TouchableWithoutFeedback>
      </View>
      <View>
        <Text style={{ color: '#ccc', fontWeight: 'bold' }}>{data.userQty}</Text>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={() => actions.incrementQty(data.cartId, data.stock)}>
          {plusIcon}
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
