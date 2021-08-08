import React from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import { defaultShopImages } from '../../../constants/shop';
import { imageSelectionType, PictureType } from '../../../models/picture';

interface DefaultPictureSelection {
  actions: {
    handleDefultSelection: (selection: imageSelectionType) => void;
  };
}

export const DefaultPictureSelection: React.FC<DefaultPictureSelection> = ({ actions }) => {
  return (
    <View flex-1 center>
      <View center padding-15>
        <Text bold> OR select from one of these</Text>
      </View>
      <View row>
        {defaultShopImages.map((x: PictureType, index: number) => (
          <TouchableWithoutFeedback
            onPress={() => actions.handleDefultSelection({ raw: true, image: x })}>
            <Image
              style={{ height: 100, width: 100, marginRight: 5 }}
              source={{ uri: x.imagePath }}
            />
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};
