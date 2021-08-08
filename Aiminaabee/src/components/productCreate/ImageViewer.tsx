import React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableWithoutFeedback } from 'react-native';

import { ImageLoader } from '../../components/comon/ImageLoader';
import { PictureType } from '../../models/picture';

//funcs
import { imagePicker } from '../../utils/fileUploadFuncs';
import { productRegisterMutations } from '../../localState/ProductCreateTemp';
import { productCreateTempVar } from '../../services/client/cache';

//icons
import { sharedIcon } from '../../utils/icons';

let { width } = Dimensions.get('window');
const HEIGHT = 200;

export const ImageViewer = () => {
  //local state
  const { updateImages } = productRegisterMutations;
  const productTempValues = productCreateTempVar();
  const localProdImages = productTempValues.productImages;

  const loadGalleryScreen = async () => {
    const image = await imagePicker();
    console.log('image', image);
    updateImages(image);
    console.log('product temp', productTempValues);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ borderWidth: 1, borderColor: '#fff' }}>
          <TouchableWithoutFeedback onPress={() => loadGalleryScreen()}>
            {localProdImages[0] ? (
              <ImageLoader
                style={{ height: HEIGHT, width: width / 2 }}
                source={{ uri: localProdImages[0].imagePath }}
              />
            ) : (
              <View style={styles.emptyBox}>
                <View>
                  <Text>{sharedIcon('plus')}</Text>
                </View>
              </View>
            )}
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={() => loadGalleryScreen()}>
            {localProdImages[1] ? (
              <ImageLoader
                style={{ height: HEIGHT, width: width / 2 }}
                source={{ uri: localProdImages[1].imagePath }}
              />
            ) : (
              <View style={styles.emptyBox}>
                <View>
                  <Text>{sharedIcon('plus')}</Text>
                </View>
              </View>
            )}
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ borderWidth: 1, borderColor: '#fff' }}>
          <TouchableWithoutFeedback onPress={() => loadGalleryScreen()}>
            {localProdImages[2] ? (
              <ImageLoader
                style={{ height: HEIGHT, width: width / 2 }}
                source={{ uri: localProdImages[2].imagePath }}
              />
            ) : (
              <View style={styles.emptyBox}>
                <View>
                  <Text>{sharedIcon('plus')}</Text>
                </View>
              </View>
            )}
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={() => loadGalleryScreen()}>
            {localProdImages[3] ? (
              <ImageLoader
                style={{ height: HEIGHT, width: width / 2 }}
                source={{ uri: localProdImages[3].imagePath }}
              />
            ) : (
              <View style={styles.emptyBox}>
                <View>
                  <Text>{sharedIcon('plus')}</Text>
                </View>
              </View>
            )}
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: HEIGHT * 2,
  },
  emptyBox: {
    height: HEIGHT,
    width: width / 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#f2f2f2',
  },
});
