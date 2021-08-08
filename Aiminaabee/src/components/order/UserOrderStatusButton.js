import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { useMutation } from '@apollo/client';

import { CHANGE_ORDER_STATUS } from '../../../requests/mutations/order';
import { GET_ORDER_DETAILS } from '../../../requests/orders';


const userOrderStatusButton = ({ data, actions }) => {

   const { orderId, status } = data ?? {};

   return (
      <View style={styles.container}>
         {
            status === 'shipped' ? (
               <TouchableWithoutFeedback onPress={() => changeOrderStatus(orderId, status = 3)} >
                  <View style={styles.cardContainer}>
                     <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#ccc', fontSize: 14 }}>Confirm Delivery</Text>
                     </View>
                  </View>
               </TouchableWithoutFeedback>
            ) : (
                  <View style={styles.cardContainer}>
                     <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#ccc', fontSize: 14 }}>{status}</Text>
                     </View>
                  </View>
               )
         }
      </View >
   )

};




const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginBottom: 20
   },
   cardContainer: {
      flexDirection: 'row',
      borderRadius: 12,
      backgroundColor: '#23272A',
      padding: 15,
      marginTop: 10,
   }
});



export default userOrderStatusButton;