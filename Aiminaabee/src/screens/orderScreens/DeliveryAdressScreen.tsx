import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { useQuery } from '@apollo/client';
import { GET_ORDER_DELIVERY_ADRESS } from '../../requests/orders';

//components
import { ShippingAddressess } from '../../components/shipping/ShippingAdressCard';

export const DeliveryAdressScreen: NavigationFunctionComponent = ({
  componentId,
  shippingId,
}: any) => {
  const { loading, data, refetch } = useQuery(GET_ORDER_DELIVERY_ADRESS, {
    variables: { shippingId: shippingId },
  });

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View style={styles.container}>
      <ShippingAddressess
        data={{
          shippingAdressId: data.getDeliveryAddress.id,
          houseName: data.getDeliveryAddress.houseName,
          streetName: data.getDeliveryAddress.streetName,
          appartment: data.getDeliveryAddress.appartment,
          floor: data.getDeliveryAddress.floor,
          island: data.getDeliveryAddress.island,
          phone: data.getDeliveryAddress.phone,
          zipCode: data.getDeliveryAddress.zipCode,
          isDefault: data.getDeliveryAddress.isDefault,
          screen: 'orderDetail',
        }}
        actions={{
          onPressShippingRow: () => null,
        }}
      />
    </View>
  );
};

DeliveryAdressScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
