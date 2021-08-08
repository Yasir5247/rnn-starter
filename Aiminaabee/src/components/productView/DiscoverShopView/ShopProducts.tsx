import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { ImageLoader } from '../../comon/ImageLoader';
import { randomImages } from '../../../constants/shop';

let { width } = Dimensions.get('window');

interface ShopProductsProps {
  data: {
    shopPImages: any;
  };
}

export const ShopProducts: React.FC<ShopProductsProps> = ({ data }) => {
  let filledArray = new Array(3)
    .fill(null)
    .map((x, index) => ({ id: index, image: randomImages() }));

  const PImgArr: any = data !== null ? data : filledArray;

  return (
    <View style={styles.container}>
      <View style={[styles.pictureBox, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]}>
        <ImageLoader
          style={{ height: '100%', width: '100%' }}
          imageStyle={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
          source={{ uri: PImgArr[0]?.image ?? randomImages() }}
        />
      </View>
      <View style={styles.pictureBox}>
        <ImageLoader
          style={{ height: '100%', width: '100%' }}
          source={{ uri: PImgArr[1]?.image ?? randomImages() }}
        />
      </View>
      <View style={[styles.pictureBox, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]}>
        <ImageLoader
          style={{ height: '100%', width: '100%' }}
          imageStyle={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
          source={{ uri: PImgArr[2]?.image ?? randomImages() }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 8,
    // borderWidth: 1, borderColor: '#000'
  },
  pictureBox: {
    width: width / 3 - 10,
    height: 130,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  //center
  centerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
