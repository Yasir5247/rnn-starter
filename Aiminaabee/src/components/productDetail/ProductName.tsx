import React from 'react';
import { View, Text } from 'react-native-ui-lib';

interface ProductNameProps {
  data: {
    productName: string;
    productPrice: number;
  };
}

export const ProductName: React.FC<ProductNameProps> = ({ data }) => {
  return (
    <View padding-15 bg-bgColor style={{ borderTopWidth: 2, borderColor: '#f2f2f2' }}>
      <View marginB-3>
        <Text boldHeading>{data.productName}</Text>
      </View>
      <View>
        <Text lightHeading>{data.productPrice}</Text>
      </View>
    </View>
  );
};
