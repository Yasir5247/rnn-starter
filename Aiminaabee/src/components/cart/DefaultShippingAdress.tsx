import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import { useQuery } from '@apollo/client';
import { GET_SHIPPING_ADDRESS } from '../../requests/users';
import {
  GetShippingAdress,
  GetShippingAdressVariables,
} from '../../requests/__generated__/GetShippingAdress';

//icon
import { sharedIcon } from '../../utils/icons';

export const DefaultShippingAdress = () => {
  //shipping address query
  const { loading, data } = useQuery<GetShippingAdress, GetShippingAdressVariables>(
    GET_SHIPPING_ADDRESS,
    {
      variables: { default: true },
    },
  );

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  const defaultAdress = data?.getShippingAdress ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.defaultShippingContainer}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: '#fff' }}>Selected Adress</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{ color: '#fff' }}>{defaultAdress[0]?.houseName} </Text>
          <Text style={{ color: '#fff' }}> {sharedIcon('verified')} </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultShippingContainer: {
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C3747',
    padding: 10,
    marginVertical: 10,
    borderRadius: 12,
  },
});
