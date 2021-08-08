import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-ui-lib';

//components
import { ImageLoader } from '../../comon/ImageLoader';

//services
import { useServices } from '../../../services';

interface FollowerCardProps {
  data: {
    shopId: number;
    shopName: string;
    shopImage: string;
    isShopFollowed: boolean;
    numProducts: number;
    numFollowers: number;
    loadingStatus: boolean;
  };
  actions: {
    followShop: (shopId: any, status: any) => void;
    onPressNext: () => void;
    showShop: (shopId: any, status: any) => void;
  };
}

export const FollowerCard: React.FC<FollowerCardProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();

  const status = data.isShopFollowed ? 0 : 1;

  return (
    <View style={[styles.container]}>
      <View style={[styles.topContainer, styles.centerStyle]}>
        <Text style={styles.shopNameText}>Discover Shops</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => actions.showShop(data.shopId, data.shopName)}>
        <View style={[styles.middleContainer, styles.centerStyle]}>
          <View style={{ width: 100, height: 100, marginBottom: 10 }}>
            {data.loadingStatus ? (
              <View style={[styles.loadingBox, styles.centerStyle]}>
                <ActivityIndicator style={{ margin: 5 }} size="large" color={'#fff'} />
              </View>
            ) : (
              <ImageLoader
                style={{ width: '100%', height: '100%' }}
                imageStyle={{ borderRadius: 100 }}
                source={{ uri: data.shopImage }}
              />
            )}
          </View>
          <View style={[styles.shopInfoBox, styles.centerStyle]}>
            <Text style={styles.shopNameText}>{data.shopName}</Text>
          </View>
          <View style={[styles.shopInfoBox, styles.centerStyle]}>
            <Text style={[styles.shopInfoText, { marginRight: 10 }]}>
              {data.numProducts} Products
            </Text>
            <Text style={styles.shopInfoText}>{data.numFollowers} Follwers</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.bottomContainer}>
        <View style={{ width: '50%', padding: 5 }}>
          <Button
            bg-btnBg
            br20
            label={t.do('section.appWideButtons.button.shuffle')}
            onPress={() => actions.onPressNext()}
          />
        </View>
        <View style={{ width: '50%', padding: 5 }}>
          <Button
            bg-btnBg
            br20
            label={t.do('section.appWideButtons.button.follow')}
            onPress={() => actions.followShop(data.shopId, status)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    // borderWidth: 1, borderColor: 'red'
  },
  topContainer: {
    height: '20%',
    // borderWidth: 1, borderColor: 'red'
  },
  middleContainer: {
    height: '60%',
    // borderWidth: 1, borderColor: 'red'
  },
  bottomContainer: {
    height: '20%',
    padding: 5,
    flexDirection: 'row',
    // borderWidth: 1, borderColor: 'red'
  },
  shopInfoBox: {
    flexDirection: 'row',
    padding: 10,
    // borderWidth: 1, borderColor: 'red'
  },
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  loadingBox: {
    backgroundColor: '#000',
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
  //Text
  shopNameText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  shopInfoText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
