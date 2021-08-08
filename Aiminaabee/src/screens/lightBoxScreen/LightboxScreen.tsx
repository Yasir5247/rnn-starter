import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';

import { NavigationFunctionComponent } from 'react-native-navigation';

import Lightbox from 'react-native-lightbox';

export const LightBoxScreen: NavigationFunctionComponent = ({ images }: any) => {
  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      {images.length
        ? images.map((x: any) => (
            <View style={{ borderBottomWidth: 2, borderColor: '#fff' }}>
              <Image style={{ height: 400, width: '100%' }} source={{ uri: x }} />
            </View>
          ))
        : null}
    </ScrollView>
  );
};

LightBoxScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
