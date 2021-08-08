import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';

import ImageLoader from '../../../components/Common/ImageLoader';

let { width } = Dimensions.get('window');
const HEIGHT = 100;
const WIDTH = 100;


const imageView = ({ reviewImage }) => {


   return (

      <View style={styles.container}>
         <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {
               reviewImage && reviewImage.map(image => (
                  <View style={styles.imageBox}>
                     <ImageLoader
                        style={{ height: HEIGHT, width: WIDTH }}
                        imageStyle={{ borderRadius: 8 }}
                        source={{ uri: image.path }}
                     />
                  </View>
               ))
            }
         </ScrollView>
      </View>
   )
}



const styles = StyleSheet.create({
   container: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      backgroundColor: '#FFF'
   },
   imageBox: {
      height: HEIGHT,
      width: WIDTH,
      marginRight: 5
   }
});



export default imageView;