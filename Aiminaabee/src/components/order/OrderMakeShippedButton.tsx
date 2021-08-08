import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

interface MakeShippedButtonProps {
  data: {
    orderId: number;
    title: string;
    status: string;
  };
  actions: {
    cancelOrder: (orderId: number, orderStatus: string) => void;
  };
}

export const OrderMakeShippedButton: React.FC<MakeShippedButtonProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => actions.cancelOrder(data.orderId, data.status)}>
        <View style={styles.cardContainer}>
          <Text style={{ color: '#fff', fontSize: 14, marginRight: 10 }}>Make Shipped</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#2C3747',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
