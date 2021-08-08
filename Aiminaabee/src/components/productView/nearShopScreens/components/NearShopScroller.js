import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import NearShopsHeader from '../Components/NearShopsHeader';
import NearShopCard from '../Components/NearShopCard';



const nearShopScroller = ({ data, actions }) => {

   return (
      <View style={styles.container}>
         <NearShopsHeader
            isShop={data.length ? true : false}
         />
         {
            data.length ? (
               <View style={styles.nearShopContainer}>
                  <ScrollView
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}
                  >
                     {data.map(x => (
                        <NearShopCard
                           key={x.id}
                           data={{
                              shopId: x.id,
                              shopName: x.name,
                              shopPicture: x.avatar,
                              locationCover: x.locationCover,
                              cordinates: x.cords,
                           }}
                           {...actions}
                        />
                     ))}
                  </ScrollView>
               </View>
            ) : null
         }
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      marginHorizontal: 5,
      // borderWidth: 1, borderColor: 'red',
   },
   nearShopContainer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      backgroundColor: theme.CARD_BACKGROUND_COLOR,
      paddingVertical: 5,
      // borderWidth: 1, borderColor: 'blue',
   },

});

export default nearShopScroller;

