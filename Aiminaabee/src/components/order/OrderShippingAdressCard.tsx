import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

//icons
import { sharedIcon } from '../../utils/icons';

interface ShippingAddCardProps {
  data: {
    orderId: number;
    shippingId: number;
  };
  actions: {
    showDeliveryAdressScreen: (orderId: number, shippingId: number) => void;
  };
}

export const OrderShippingAdressCard: React.FC<ShippingAddCardProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => actions.showDeliveryAdressScreen(data.orderId, data.shippingId)}>
        <View style={styles.cardContainer}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#ccc', fontSize: 14 }}>Delivery Adress</Text>
          </View>
          <View>
            <Text style={{ color: '#ccc', fontSize: 14, marginRight: 10 }}>
              {sharedIcon('rightArrow')}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#23272A',
    padding: 15,
  },
});
