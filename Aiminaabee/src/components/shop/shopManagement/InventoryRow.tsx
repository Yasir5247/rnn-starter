import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { ImageLoader } from '../../comon/ImageLoader';

import { GetShopInventory_getShopInventory_products } from '../../../requests/__generated__/GetShopInventory';

import { sharedIcon } from '../../../utils/icons';

interface InventoryRowProps {
  data: GetShopInventory_getShopInventory_products;
  actions: {
    onDeletePressed: (id: number) => void;
  };
}

export const InventoryRow: React.FC<InventoryRowProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.productRow}>
        <View style={styles.rowLeft}>
          <View>
            <ImageLoader
              style={{ width: 45, height: 45 }}
              imageStyle={{ borderRadius: 8 }}
              source={{ uri: data.defaultImage }}
            />
          </View>
          <View style={styles.productNameColum}>
            <View>
              <Text style={styles.productNameText}>{data.name}</Text>
            </View>
            <View>
              <Text style={styles.productNameText}>Stock: {data.stock}</Text>
            </View>
          </View>
        </View>
        <View style={styles.middle}>
          <View>
            <Text style={styles.priceText}>{data.formatedPrice}</Text>
          </View>
        </View>
        <View style={styles.rowRight}>
          <TouchableWithoutFeedback onPress={() => actions.onDeletePressed(data.id)}>
            {sharedIcon('verticalDots')}
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  rowLeft: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    width: '25%',
    // borderWidth: 1,
    // borderColor: '#000'
  },
  rowRight: {
    width: '10%',
    justifyContent: 'center',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  productNameColum: {
    flex: 1,
    paddingLeft: 8,
    flexDirection: 'column',
  },
  productNameText: {
    color: '#000',
    fontSize: 16,
  },
  priceText: {
    color: '#000',
    fontSize: 16,
  },
});
