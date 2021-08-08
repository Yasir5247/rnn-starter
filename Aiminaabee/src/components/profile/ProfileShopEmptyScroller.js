import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={20} color="blue" />;

const profileShopEmptyScroller = ({ createShop }) => {

   return (

      <TouchableWithoutFeedback onPress={createShop.bind(this)}>
         <View style={styles.emptyContaner}>
            <View>
               <Text>{plusIcon}  </Text>
            </View>
            <View>
               <Text>Create your shop</Text>
            </View>
         </View>
      </TouchableWithoutFeedback>

   );
}


const styles = StyleSheet.create({

   emptyContaner: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'blue',
   }
})


export default profileShopEmptyScroller
