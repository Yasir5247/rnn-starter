import React from 'react';
import { StyleSheet, View, Text } from 'react-native';




const CartEmptyHeader = () => {

   return (
      <View style={styles.container}>
         <Text style={{ color: '#fff' }}>Your Cart Looks Light</Text>
      </View>
   );

}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2C2F33',
      borderRadius: 8,
      height: 40,
      padding: 10
   }
})

export default CartEmptyHeader;
