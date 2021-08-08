import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import { useApolloClient } from '@apollo/client';

import { ImageLoader } from '../comon/ImageLoader';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
const addTocart = <Icon1 name="cart-plus" size={20} />;

import { ADD_TO_SHOPPING_CART } from '../../requests/mutations/shoppingCart';
import { TOGGLE_LIKE_STATUS } from '../../requests/mutations/product';
import { GET_SHOPPING_CART } from '../../requests/shoppingCart';

interface HolderProps {
  data: {
    productId: number;
    productImage: string;
    productName: string;
    productPrice: string;
    isLiked: boolean;
    isInCart: boolean;
  };
}

export const Holder: React.FC<HolderProps> = ({ data }) => {
  //state
  const [showToast, setShowToast] = useState<boolean>(false);

  //apollo
  const apolloClient = useApolloClient();

  const _toggleLikeStatus = () => {
    apolloClient.mutate({
      mutation: TOGGLE_LIKE_STATUS,
      variables: {
        productId: data.productId,
        status: data.isLiked ? 0 : 1,
      },
    });
  };

  const _addToCartHandler = async () => {
    await apolloClient.mutate({
      mutation: ADD_TO_SHOPPING_CART,
      variables: { productId: data.productId },
      refetchQueries: [{ query: GET_SHOPPING_CART, variables: { limit: 20, offset: 0 } }],
    });
    setShowToast(true);
  };

  return (
    <View style={styles.CatHolder}>
      <View style={styles.header}>
        <View>
          <View style={styles.hotLabelText}>
            <Text>hot</Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={_toggleLikeStatus}>
          <View>
            {data.isLiked ? (
              <Icon name="ios-heart" size={25} color="red" />
            ) : (
              <Icon name="ios-heart" size={25} color="black" />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.pictureBox}>
        <ImageLoader
          style={{ width: '100%', height: '100%', alignItems: 'center' }}
          imageStyle={{ borderRadius: 12 }}
          source={{ uri: data.productImage }}
        />
      </View>
      <View style={styles.subCatBox}>
        <View>
          <Text>{data.productName}</Text>
          <Text style={{ fontWeight: 'bold' }}>MVR:{data.productPrice}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          {data.isInCart ? (
            <View>
              <Text>in cart</Text>
            </View>
          ) : (
            <TouchableWithoutFeedback onPress={_addToCartHandler}>
              <View>{addTocart}</View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CatHolder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF0F2',
    borderRadius: 12,
    marginRight: 20,
    width: 200,
    height: 280,
    //Border
    borderWidth: 0.5,
    borderColor: '#EDF0F2',
  },
  header: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hotLabelText: {
    padding: 5,
    width: 60,
    backgroundColor: 'yellow',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pictureBox: {
    flex: 1,
    backgroundColor: '#EDF0F2',
    padding: 15,
    width: '100%',
  },
  subCatBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#EDF0F2',
  },
});
