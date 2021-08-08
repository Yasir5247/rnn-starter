import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

interface SubCatScrollerProps {
  data: {
    categoryId: number;
    categoryName: string;
  };
  actions: {
    onSubCatPress: (categoryId: number, categoryName: string) => void;
  };
}

export const SubCatScroller: React.FC<SubCatScrollerProps> = ({ data, actions }) => {
  return (
    <View bg-btnBg paddingH-20 paddingV-5 marginL-5 marginV-10 br40>
      <TouchableWithoutFeedback
        onPress={() => actions.onSubCatPress(data.categoryId, data.categoryName)}>
        <Text h1 white>
          {data.categoryName}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
