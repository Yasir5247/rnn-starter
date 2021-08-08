import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

import { ImageLoader } from '../../components/comon/ImageLoader';
import { AuthUserShops_authUserShops } from '../../requests/__generated__/AuthUserShops';

interface ShopScrollerProps {
  data: AuthUserShops_authUserShops;
  actions: {
    showShop: (shopId: number, shopName: string) => void;
  };
}

export const ShopScroller: React.FC<ShopScrollerProps> = ({ data, actions }) => {
  return (
    <TouchableWithoutFeedback onPress={() => actions.showShop(data.id, data.name)}>
      <View style={styles.shopHolder}>
        <View style={styles.shopImageHolder}>
          <ImageLoader
            style={{ width: 40, height: 40 }}
            imageStyle={{ borderRadius: 100 }}
            source={{ uri: data.avatar }}
          />
        </View>
        <View style={styles.shopInfo}>
          <View>
            <Text style={styles.textStyle}>{data.name}</Text>
          </View>
          <View>
            <Text style={styles.textStyle}>Total Products: {data.numProducts}</Text>
          </View>
        </View>
        <View>
          {data.isBlocked ? (
            <Text style={[styles.textStyle, { color: 'red' }]}> Blocked</Text>
          ) : (
            <Text style={styles.textStyle}> Active</Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  shopHolder: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2C2F33',
    borderRadius: 5,
    marginBottom: 5,
  },
  shopImageHolder: {
    width: 40,
    height: 40,
    borderRadius: 100,
    // borderWidth: 1, borderColor: '#fff'
  },
  shopInfo: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'column',
  },
  textStyle: {
    color: '#FFF',
  },
});
