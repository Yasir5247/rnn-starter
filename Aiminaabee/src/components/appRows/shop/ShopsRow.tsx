import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

import { ImageLoader } from '../../comon/ImageLoader';

//services
import { useServices } from '../../../services';

interface ShopRowProps {
  data: {
    shopId: number;
    shopName: string;
    shopPicture: string;
    numProducts: number;
    isShopFollowed: boolean;
  };
  actions: {
    toggleFollowShop: (shopId: number, status: boolean) => void;
    onItemPressed: (id: number, name: string) => void;
  };
}

export const ShopsRow: React.FC<ShopRowProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();
  const followingStatus = data.isShopFollowed ? false : true;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <TouchableWithoutFeedback
            onPress={() => actions.onItemPressed(data.shopId, data.shopName)}>
            <View>
              <ImageLoader
                style={{ width: 40, height: 40 }}
                imageStyle={{ borderRadius: 100 }}
                source={{ uri: data.shopPicture }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.userNameContainer}>
          <Text style={styles.headingText}>{data.shopName}</Text>
          <Text style={styles.subHeadingText}>{data.numProducts} Products</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            bg-btnBg
            br20
            label={
              followingStatus
                ? t.do('section.appWideButtons.button.follow')
                : t.do('section.appWideButtons.button.unfollow')
            }
            onPress={() => actions.toggleFollowShop(data.shopId, followingStatus)}
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
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '15%',
    // borderWidth: 1,
    // borderColor: '#000'
  },
  userNameContainer: {
    flex: 1,
    paddingLeft: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: '55%',
    // borderWidth: 1,
    // borderColor: '#000'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '30%',
    // borderWidth: 1,
    // borderColor: '#000'
  },
  headingText: {
    color: '#000',
    fontSize: 14,
  },
  subHeadingText: {
    color: '#000',
    fontSize: 14,
  },
});
