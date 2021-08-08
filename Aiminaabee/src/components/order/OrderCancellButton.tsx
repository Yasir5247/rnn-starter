import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface OrderCancelButtonProps {
  data: {
    orderId: number;
    title: string;
    status: string;
  };
  actions: {
    changeOrderStatus: (orderId: number, orderStatus: string) => void;
  };
}

export const OrderCancellButton: React.FC<OrderCancelButtonProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => actions.changeOrderStatus(data.orderId, data.status)}>
        <View style={styles.cardContainer}>
          <Text style={{ color: 'red', fontSize: 14, marginRight: 10 }}>{data.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 22,
    backgroundColor: '#2C3747',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
