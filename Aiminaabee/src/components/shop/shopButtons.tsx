import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

//Constants
const iconSize = 20;
const iconColor = '#000';

import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Feather';

//Shop Icons
const locationIcon = <Icon2 name="map-marker-outline" size={iconSize} color={iconColor} />;
const relatedShopsIcon = <Icon3 name="chevrons-right" size={iconSize} color={iconColor} />;

interface ShopButtonProps {
  data: {
    shopId: number;
    shopName: string;
    shopPicture: string;
    numShopProducts: number;
    categoryId: number;
  };
  actions: {
    showShopMap: (shopId: number, shopName: string) => void;
    showShopRelated: (categoryId: number) => void;
  };
}

export const ShopButtons: React.FC<ShopButtonProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={[styles.directionbutton, styles.centerStyle, { marginRight: 5 }]}>
          <TouchableWithoutFeedback onPress={() => actions.showShopMap(data.shopId, data.shopName)}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{locationIcon}</Text>
              <Text style={styles.buttonText}> Location</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.directionbutton, styles.centerStyle]}>
          <TouchableWithoutFeedback onPress={() => actions.showShopRelated(data.categoryId)}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{relatedShopsIcon}</Text>
              <Text style={styles.buttonText}> Related Shops</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {data.numShopProducts === 0 ? (
        <View style={[styles.emptyContainer, styles.centerStyle]}>
          <Text> No Products</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // borderWidth: 1, borderColor: '#000',
  },
  section: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  directionbutton: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#A6A9AC',
    // backgroundColor: '#ECF1F4'
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  emptyContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  centerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
