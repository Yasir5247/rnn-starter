import React, { version } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import { ImageLoader } from '../../comon/ImageLoader';
import { NearShopsHeader } from './components/NearShopsHeader';


interface NearShopProps {
  data: any;
  actions: any
}


export const NearShopScroller: React.FC<NearShopProps> = ({ data, actions }: any) => {


  return (
    <View style={styles.container}>
      <NearShopsHeader />
      <View style={styles.nearShopContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {data.length ? data.map((x: any) => (
            <TouchableWithoutFeedback onPress={() => actions.onShopPress(x.id, x.name)}>
              <View style={styles.shopHolder}>
                <View style={styles.shopBox}>
                  <View style={styles.shopSmallBox}>
                    <ImageLoader
                      imageStyle={{ borderRadius: 100 }}
                      style={{ width: '100%', height: '100%' }}
                      source={{ uri: x.avatar }}
                    />
                  </View>
                  <ImageLoader
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.awesomePicture}
                    source={{ uri: x.locationCover }}
                  />
                  <View style={styles.shopNameBox}>
                    <Text
                      style={[styles.shopNameText, { textShadowOffset: { width: 2, height: -2 } }]}>
                      {x.name}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )) : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: 'green',
  },
  nearShopContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 5,
    paddingLeft: 5,
    //  borderWidth: 1,
    //  borderColor: 'red',
  },
  shopHolder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 4,
    width: 130,
    height: 190,
    // borderWidth: 1,
    //  borderColor: 'blue',
  },
  shopBox: {
    width: '100%',
    height: '100%',
    // borderWidth: 1,
    //  borderColor: 'pink',
  },
  shopSmallBox: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    left: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 100,
    height: 30,
    width: 30,
  },
  awesomePicture: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    width: undefined,
    height: undefined,
  },
  shopNameBox: {
    position: 'absolute',
    width: '90%',
    zIndex: 1,
    bottom: 10,
    left: 10,
  },
  shopNameText: {
    fontSize: 14,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 100,
  },
});

