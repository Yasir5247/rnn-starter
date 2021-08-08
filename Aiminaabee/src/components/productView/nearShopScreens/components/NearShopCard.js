import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import ImageLoader from '../../../Common/ImageLoader';
import * as func from '../../../utility/utilFuncs';


const NearShopCard = ({ data, onShopPress }) => {

   const { shopId, shopName, shopPicture, locationCover, cordinates } = data ?? {};

   return (
      <View style={styles.container}>
         <TouchableWithoutFeedback onPress={() => onShopPress(shopId, shopName)}>
            <View style={styles.shopHolder}>
               <View style={styles.shopBox}>
                  <View style={styles.shopSmallBox}>
                     <ImageLoader
                        imageStyle={{ borderRadius: 100 }}
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: shopPicture }}
                        blurRadius={0}
                     />
                  </View>
                  <ImageLoader
                     imageStyle={{ borderRadius: 10 }}
                     style={styles.awesomePicture}
                     source={{ uri: locationCover }}
                     blurRadius={0}
                  />
                  <View style={styles.shopNameBox}>
                     <Text
                        style={[styles.shopNameText, { textShadowOffset: { width: 2, height: -2 } }]}>
                        {func.stringCutter(shopName, 14)}
                     </Text>
                  </View>
               </View>
            </View>
         </TouchableWithoutFeedback>
      </View>
   );

}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      // borderWidth: 1, borderColor: 'yellow',
   },
   shopHolder: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5,
      borderRadius: 4,
      width: 130,
      height: 190,
      // borderWidth: 1, borderColor: 'blue',
   },
   shopBox: {
      width: '100%',
      height: '100%',
      // borderWidth: 1, borderColor: 'pink',
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
})

export default NearShopCard