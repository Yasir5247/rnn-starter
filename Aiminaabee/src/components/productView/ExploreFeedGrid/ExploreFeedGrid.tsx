import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

import { ImageLoader } from '../../comon/ImageLoader';
import { BookmarkButton } from '../../comon/BookmarkButton';

let { width } = Dimensions.get('window');

interface ExploreFeedGridProps {
  data: {
    product: {
      productId: number;
      productName: string;
      productPrice: number;
      productImage: string;
      isBookmarked: boolean;
    };
    shop?: {
      shopId: number;
      shopName: string;
      shopAvatar: string;
    };
  };
  actions: {
    toggleBookmark: (productId: number, status: any) => void;
    showProduct: (productId: number, productName: string) => void;
  };
}

export const ExploreFeedGrid: React.FC<ExploreFeedGridProps> = ({ data, actions }) => {
  //checks
  const displayShop = data.shop ? true : false;
  const isBookmarked = data.product.isBookmarked ? 0 : 1;

  return (
    <View style={styles.productGridContainer}>
      <View style={styles.productContainer}>
        <TouchableWithoutFeedback
          onPress={() => actions.showProduct(data.product.productId, data.product.productName)}>
          <View>
            <ImageLoader
              style={styles.prodImageStyle}
              source={{ uri: data.product.productImage }}
              imageStyle={{ borderRadius: 8 }}
            />
            {displayShop ? (
              <View style={styles.shopSmallBox}>
                <View>
                  <ImageLoader
                    style={{ width: 20, height: 20, borderRadius: 100 }}
                    imageStyle={{ borderRadius: 100 }}
                    source={{ uri: data.shop.shopAvatar }}
                  />
                </View>
                <View style={styles.shopNameBox}>
                  <Text style={styles.shopNameText}>{data.shop.shopName}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.informationContainer}>
          <View style={{ flex: 1, paddingRight: 5 }}>
            <Text textColor h1>
              {data.product.productName}
            </Text>
            <Text textColor h1>
              {data.product.productPrice}
            </Text>
          </View>
          <View>
            <BookmarkButton
              data={{
                productId: data.product.productId,
                status: isBookmarked,
              }}
              actions={{
                toggleBookmark: (productId: number, status: any) =>
                  actions.toggleBookmark(productId, status),
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productGridContainer: {
    width: width / 2 - 10,
    alignItems: 'center',
    paddingVertical: 5,
  },
  productContainer: {
    // width: '50%',
    // flex: 0.5,
  },
  informationContainer: {
    width: width / 2 - 20,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  prodImageStyle: {
    height: 190,
    width: width / 2 - 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f2f2f2',
  },
  shopSmallBox: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
    width: '90%',
  },
  shopNameBox: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  productNameText: {
    fontSize: 12,
    color: '#000',
  },
  productPriceText: {
    color: '#000',
    fontSize: 12,
  },
  shopNameText: {
    fontSize: 14,
    color: '#fff',
  },
});
