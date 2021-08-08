import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native';
import { View, Image } from 'react-native-ui-lib';

interface BookmarkButtonProps {
  data: {
    productId: number;
    status: any;
  };
  actions: {
    toggleBookmark: (productId: number, status: any) => void;
  };
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ data, actions }) => {
  const content = (
    <View>
      {data.status ? (
        <Image assetName="bookmark" assetGroup="tabIcons" style={{ width: 20, height: 20 }} />
      ) : (
        <Image
          assetName="bookmarkSelected"
          assetGroup="tabIcons"
          style={{ width: 20, height: 20 }}
        />
      )}
    </View>
  );

  if (Platform.OS === 'android') {
    return (
      <TouchableWithoutFeedback onPress={() => actions.toggleBookmark(data.productId, data.status)}>
        {content}
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={() => actions.toggleBookmark(data.productId, data.status)}>
      {content}
    </TouchableOpacity>
  );
};
