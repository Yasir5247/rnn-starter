import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

//components
import { ImageLoader } from '../comon/ImageLoader';
import { LikeButton } from '../comon/LikeButton';
import { BookmarkButton } from '../comon/BookmarkButton';

//services
import { useServices } from '../../services';

interface LikeControlProps {
  data: {
    productId: number;
    prodName: string;
    isLiked: boolean;
    isBookmarked: boolean;
    shopId: number;
    shopName: string;
    shopPicture: string;
  };
  actions: {
    onPressShop: (shopId: number, shopName: any) => void;
    toggleLike: (productId: number, status: any) => void;
    toggleBookmark: (productId: number, status: any) => void;
  };
}

export const LikeControls: React.FC<LikeControlProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();

  //status
  const isLiked = data.isLiked ? 0 : 1;
  const isBookmarked = data.isBookmarked ? 0 : 1;

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <View style={styles.leftSize}>
          <TouchableWithoutFeedback onPress={() => actions.onPressShop(data.shopId, data.shopName)}>
            <View style={styles.shopBox}>
              <View style={{ marginRight: 5 }}>
                <ImageLoader
                  style={{ height: 30, width: 30 }}
                  imageStyle={{ borderRadius: 100 }}
                  source={{ uri: data.shopPicture }}
                />
              </View>
              <View>
                <Text style={styles.shopNameText}>{data.shopName}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.rightSide}>
          <View style={{ marginRight: 20 }}>
            <LikeButton
              data={{
                productId: data.productId,
                status: isLiked,
              }}
              actions={{
                toggleLike: (productId: number, status: any) =>
                  actions.toggleLike(productId, status),
              }}
            />
          </View>
          <View>
            <BookmarkButton
              data={{
                productId: data.productId,
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
  container: {
    flexDirection: 'column',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  leftSize: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  shopBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  rightSide: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  likePeepImg: {
    width: 30,
    height: 30,
    margin: 5,
  },
  itemInfor: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  productLikeCountText: {
    fontWeight: 'bold',
  },
  productNameText: {},
  shopNameText: {
    fontSize: 18,
    color: '#000',
  },
  centerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
