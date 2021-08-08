import React from 'react';
import { View, StyleSheet } from 'react-native';

import CardMenu from '../../../components/Common/SharedBoxMenu';


const ReviewContainer = ({ data }) => {


   const {
      name,
      description,
      price,
      stock,
      shopName,
      categoryName,
      conditionName,
   } = data;


   return (

      <View style={styles.container}>
         <CardMenu
            control='top'
            name={'Name'}
            rightText={name}
            onPressMenu={() => null}
         />
         <CardMenu
            control='middle'
            name={'Shop Name'}
            rightText={shopName}
            onPressMenu={() => null}
         />
         <CardMenu
            control='middle'
            name={'Category'}
            rightText={categoryName}
            onPressMenu={() => null}
         />
         <CardMenu
            control='middle'
            name={'Description'}
            rightText={description}
            onPressMenu={() => null}
         />
         <CardMenu
            control='middle'
            name={'Price'}
            rightText={price}
            onPressMenu={() => null}
         />
         <CardMenu
            control='middle'
            name={'Stock'}
            rightText={stock}
            onPressMenu={() => null}
         />
         <CardMenu
            control='bottom'
            name={'Condition'}
            rightText={conditionName}
            onPressMenu={() => null}
         />
      </View>
   )
}



const styles = StyleSheet.create({
   container: {
      padding: 15,
      backgroundColor: '#FFF',
   }
});



export default ReviewContainer;