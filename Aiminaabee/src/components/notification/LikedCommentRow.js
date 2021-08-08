import React from 'react';
import _ from 'lodash';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import { theme } from '../../../components/Styles/theme';

import ImageLoader from '../../../components/Common/ImageLoader';



const likedCommentRow = ({ userId, fromUserName, userImage, body, pImage, showUser }) => {


   return (

      <View style={styles.container}>
         <View style={styles.notiRow}>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
               <TouchableWithoutFeedback onPress={showUser.bind(this, userId, fromUserName)}>
                  <View>
                     <ImageLoader
                        imageStyle={{ borderRadius: 100 }}
                        style={{ width: theme.NOTI_LEFT_IMAGE_SIZE, height: theme.NOTI_LEFT_IMAGE_SIZE }}
                        source={{ uri: userImage }}
                     />
                  </View>
               </TouchableWithoutFeedback>
            </View>
            <View style={styles.message}>
               <Text>
                  <TouchableWithoutFeedback onPress={showUser.bind(this, userId, fromUserName)}>
                     <Text style={styles.boldFont}>{fromUserName.toLowerCase()}</Text>
                  </TouchableWithoutFeedback>
                  <Text style={styles.lightFont}> liked your comment </Text>
                  <Text style={styles.boldFont}>{body}</Text>
               </Text>
            </View>
            <View style={styles.button}>
               <TouchableWithoutFeedback onPress={showUser.bind(this, userId, fromUserName)}>
                  <View style={styles.pImage}>
                     <Image
                        style={{ width: 55, height: 55 }}
                        source={{ uri: pImage[0].product_image }}
                     />
                  </View>
               </TouchableWithoutFeedback>
            </View>
         </View>
      </View>
   )

};


const styles = StyleSheet.create({

   container: {
      padding: 10
   },
   notiRow: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   message: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center',
      justifyContent: 'flex-start'
   },
   boldFont: {
      fontSize: theme.NOTIFICATION_ROW_FONT_SIZE,
      fontWeight: 'bold',
      fontFamily: theme.DEFAULT_FONT_MEDIUM
   },
   lightFont: {
      fontSize: theme.NOTIFICATION_ROW_FONT_SIZE,
      fontFamily: theme.DEFAULT_FONT_MEDIUM
   }
});

export default likedCommentRow;