import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import { ImageLoader } from '../../comon/ImageLoader';

interface ProductGridProps {
  data: any;
  actions: any;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ data, actions }) => {
  const { productId, productName, productImage } = data;

  return (
    <TouchableWithoutFeedback onPress={() => actions.showProduct(productId, productName)}>
      <View style={{ borderWidth: 1, borderColor: '#f2f2f2' }}>
        <ImageLoader style={{ height: '100%', width: '100%' }} source={{ uri: productImage }} />
      </View>
    </TouchableWithoutFeedback>
  );
};
