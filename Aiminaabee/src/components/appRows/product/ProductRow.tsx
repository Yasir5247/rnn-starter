import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
const closeIcon = <Icon name="ios-close" size={30} color="#000" />;
const shopIcon = <Icon2 name="shop" size={20} color="#000" />;

import { ImageLoader } from '../../comon/ImageLoader';

interface ProductRowProps {
  data: {
    productId: number;
    productName: string;
    productImage: string;
    shopId: number;
    shopName: string;
    categoryId: number;
    categoryName: string;
  };
  actions: {
    onProductPress: (productId: number, productName: string) => void;
    onShopPress: (shopId: number, shopName: string) => void;
    onCategoryPress: (categoryId: number, categoryName: string) => void;
  };
}

export const ProductRow: React.FC<ProductRowProps> = ({ data, actions }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => actions.onProductPress(data.productId, data.productName)}>
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <ImageLoader
            style={{ width: 40, height: 40 }}
            imageStyle={{ borderRadius: 100 }}
            source={{ uri: data.productImage }}
          />
        </View>
        <View style={styles.nameBox}>
          <Text>{data.productName.substring(0, 20)}...</Text>
        </View>
        <View style={styles.hideButton}>
          <TouchableWithoutFeedback
            onPress={() => actions.onCategoryPress(data.categoryId, data.categoryName)}>
            <Text style={{ marginLeft: 10 }}>#category</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => actions.onShopPress(data.shopId, data.shopName)}>
            <Text style={{ marginLeft: 10 }}>{shopIcon}</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Text style={{ marginLeft: 10 }}>{closeIcon}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  imageBox: {
    marginRight: 5,
  },
  nameBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  hideButton: {
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
