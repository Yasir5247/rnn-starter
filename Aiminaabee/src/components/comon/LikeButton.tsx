import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native';
import { View, Image } from 'react-native-ui-lib';

interface LikeButtonProps {
  data: {
    productId: number;
    status: any;
  };
  actions: {
    toggleLike: (productId: number, status: any) => void;
  };
}

export const LikeButton: React.FC<LikeButtonProps> = ({ data, actions }) => {
  const content = (
    <View>
      {data.status ? (
        <Image assetName="heart" assetGroup="tabIcons" style={{ width: 20, height: 20 }} />
      ) : (
        <Image assetName="heartSelected" assetGroup="tabIcons" style={{ width: 20, height: 20 }} />
      )}
    </View>
  );

  if (Platform.OS === 'android') {
    return (
      <TouchableWithoutFeedback onPress={() => actions.toggleLike(data.productId, data.status)}>
        {content}
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={() => actions.toggleLike(data.productId, data.status)}>
      {content}
    </TouchableOpacity>
  );
};
