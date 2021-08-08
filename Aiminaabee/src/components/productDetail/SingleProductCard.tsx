import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

//custom types
import { converPropTypes } from './types';

//components
import { LikeControls } from './LikeControls';
import { ProductName } from './ProductName';
import { CartButton } from './CartButton';
import { ProductDetails } from './ProductDetails';
import { ProductImages } from './ProductImages';

import { ProdDetailRow } from './ProdDetailRow';

interface SingleProductCardProps {
  id: number;
  prodData: any;
  actions: {
    toggleLike: (productId: number, status: any) => void;
    toggleBookmark: (productId: number, status: any) => void;
    addToCart: (productId: number) => void;
    onPressProductImage: (images: any) => void;
    onPressShop: (shopId: number, shopName: string) => void;
    onPressDescription: (id: number) => void;
    onPressComments: (id: number) => void;
    onChatPressed: (args: converPropTypes) => void;
  };
}

export const SingleProductCard: React.FC<SingleProductCardProps> = ({ id, prodData, actions }) => {
  return (
    <View style={styles.container}>
      <ProductImages productId={prodData.id} {...actions} />
      <LikeControls
        data={{
          productId: prodData.id,
          prodName: prodData.name,
          isLiked: prodData.isLiked,
          isBookmarked: prodData.isBookmarked,
          shopId: prodData.shopId,
          shopName: prodData.shop.name,
          shopPicture: prodData.shop.picture,
        }}
        actions={{ ...actions }}
      />
      <ProductName
        data={{
          productName: prodData.name,
          productPrice: prodData.price,
        }}
      />
      <CartButton
        data={{
          productId: prodData.id,
          isInCart: prodData.isInCart,
          isOwner: prodData.isOwner,
        }}
        actions={{ ...actions }}
      />
      <ProdDetailRow
        data={{
          heading: 'Description',
          id: prodData.id,
          icon: false,
        }}
        actions={{
          onPressMenu: actions.onPressDescription,
        }}
      />
      <ProdDetailRow
        data={{
          heading: 'Comments',
          id: prodData.id,
          icon: false,
        }}
        actions={{
          onPressMenu: actions.onPressComments,
        }}
      />
      <ProductDetails
        data={{
          productId: prodData?.id,
          defaultImage: prodData?.defaultImage,
          shopId: prodData?.shop?.id,
          shopName: prodData?.shop?.name,
          shopContact: prodData?.shop?.contact,
          isOwner: prodData.isOwner,
        }}
        actions={{
          onChatPressed: actions.onChatPressed,
        }}
      />
      <View style={styles.similarProductsBanner}>
        <Text style={styles.similarHeaderText}>Similar Products</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  likeControls: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  priceText: {
    fontSize: 18,
  },
  productInfoText: {
    color: '#1DA1F2',
  },
  similarProductsBanner: {
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#f2f2f2',
  },
  similarHeaderText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
