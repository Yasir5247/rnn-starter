import React from 'react';
import { View, Text } from 'react-native-ui-lib';


type DescSectionProps = {
  text: string;
  mobileNumber: string;
};

export const OTPDescSection: React.FC<DescSectionProps> = ({ text, mobileNumber }) => {

  return (
    <View center paddingV-05>
      <Text>
        <Text h1>{text} </Text>
        <Text h2>{mobileNumber} </Text>
      </Text>
    </View>
  );
}
