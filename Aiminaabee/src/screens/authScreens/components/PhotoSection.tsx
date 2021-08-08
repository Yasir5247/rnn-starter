import React from 'react';
import { View, Image } from 'react-native-ui-lib';


export const PhotoSection: React.FC = () => {

   return (
      <View flex-1 bg-white>
         <Image
            resizeMode='cover'
            assetName="appDescImage"
            style={{ width: '100%', height: '100%' }}
         />
      </View>
   );
}
