import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

//components
import { ShopHeader } from './ShopHeader';
import { ShopProducts } from './ShopProducts';

interface DiscoverShopViewProps {
  data: {
    shopId: number;
    shopName: string;
    shopPicture: string;
    isVerified: boolean;
    isShopFollowed: boolean;
    numShopFollowers: number;
    shopPImages: any;
  };
  actions: {
    toggleFollowShop: (shopId: number, status: any) => void;
    showShop: (shopId: number, shopName: string) => void;
  };
}

export const DiscoverShopView: React.FC<DiscoverShopViewProps> = ({ data, actions }) => {
  const status = data.isShopFollowed ? false : true;

  return (
    <TouchableWithoutFeedback onPress={() => actions.showShop(data.shopId, data.shopName)}>
      <View style={styles.container}>
        <ShopHeader
          key={data.shopId}
          data={{
            ...data,
            status: status,
          }}
          actions={{ ...actions }}
        />
        <ShopProducts data={data.shopPImages} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  pictureBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  shpInforBox: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  shopFollowBox: {
    padding: 5,
    height: 50,
    width: '100%',
    // borderWidth: 1, borderColor: '#000'
  },
  //Text
  brandName: {
    color: '#000',
    fontSize: 10,
  },
  productNameText: {
    color: '#000',
    fontSize: 12,
  },
});
