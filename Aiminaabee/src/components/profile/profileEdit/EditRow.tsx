import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

//icons
import { sharedIcon } from '../../../utils/icons';

interface EditRowProps {
  data: {
    title: string;
    selectedValue: string | null;
  };
  actions: {
    onMenuPress: () => void;
  };
}

export const EditRow: React.FC<EditRowProps> = ({ data, actions }) => {
  const borderStyle = {
    borderTopWidth: 0.5,
    borderColor: '#f2f2f2',
  };

  return (
    <TouchableWithoutFeedback onPress={() => actions.onMenuPress()}>
      <View row center padding-20 style={borderStyle}>
        <View left>
          <Text bold>{data.title}</Text>
        </View>
        <View flex-1 right>
          <Text light>{data.selectedValue}</Text>
        </View>
        <View right marginL-10>
          <Text>{sharedIcon('rightArrow')}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
