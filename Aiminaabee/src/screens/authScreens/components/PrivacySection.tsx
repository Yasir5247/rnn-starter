import React from 'react';
import { View, Text } from 'react-native-ui-lib';


export const PrivacySection: React.FC = () => {

   return (
      <View padding-10 bg-bgColor>
         <Text textAlign="center">
            <Text h1 textColor>by continuing, you agree to aiminaabee's </Text>
            <Text h2 textColor>Terms of Use </Text>
            <Text h1 textColor>and confirm that you have read aiminaabee's </Text>
            <Text h2 textColor>Privacy Policy</Text>
            <Text h1>v:7.0.0</Text>
         </Text>
      </View>
   );
}
