import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import { ImageLoader } from '../../comon/ImageLoader';

interface ShopHeaderProps {
  data: {
    status: boolean;
    shopId: number;
    shopName: string;
    shopPicture: string;
    numShopFollowers: number;
    isShopFollowed: boolean;
  };
  actions: {
    toggleFollowShop: (shopId: number, status: any) => void;
  };
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.leftSide, styles.centerStyle]}>
        <View style={{ marginRight: 8 }}>
          <ImageLoader
            style={{ height: 50, width: 50 }}
            imageStyle={{ borderRadius: 100 }}
            source={{ uri: data.shopPicture }}
          />
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.shopNameText}>{data.shopName}</Text>
          <Text style={styles.followerText}>
            {data.numShopFollowers} {data.numShopFollowers === 1 ? 'follower' : 'followers'}
          </Text>
        </View>
      </View>
      <View style={styles.rightSide}>
        <TouchableWithoutFeedback
          onPress={() => actions.toggleFollowShop(data.shopId, data.status)}>
          <View>
            {data.isShopFollowed ? (
              <Text style={styles.followText}>Unfollow</Text>
            ) : (
              <Text style={styles.followText}>Follow</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    padding: 10,
    // borderWidth: 1, borderColor: '#000'
  },
  leftSide: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'flex-start',
    // borderWidth: 1, borderColor: '#000',
  },
  rightSide: {
    width: '30%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-end',
    // borderWidth: 1, borderColor: '#000'
  },
  //center
  centerStyle: {
    alignContent: 'center',
    alignItems: 'center',
  },
  shopNameText: {
    fontSize: 18,
    color: '#000',
  },
  followerText: {
    fontSize: 14,
    color: '#999',
  },
  followText: {
    fontSize: 18,
  },
});
