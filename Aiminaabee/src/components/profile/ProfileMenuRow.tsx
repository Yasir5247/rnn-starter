import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

//icons
import { sharedIcon } from '../../utils/icons';

interface ProfileMenuRowTypes {
  data: {
    userId: number;
    title: string;
    relatedIcon: any;
    count?: number;
    number?: boolean;
  };
  actions: {
    onPressUserMenu: (userId: number) => void;
  };
}

export const ProfileMenuRow: React.FC<ProfileMenuRowTypes> = ({ data, actions }) => {
  const borderBottomStyle = { borderBottomWidth: 0.5, borderColor: '#f2f2f2' };
  return (
    <TouchableWithoutFeedback onPress={() => actions.onPressUserMenu(data.userId)}>
      <View bg-bgColor center flex-1 row paddingV-15 style={borderBottomStyle}>
        {!!data.relatedIcon && (
          <View center style={{ width: '15%' }}>
            <Text>{data.relatedIcon}</Text>
          </View>
        )}
        {!!data.title && (
          <View flex left style={{ width: '70%' }}>
            <Text h1 textColor>
              {data.title}
            </Text>
          </View>
        )}
        <View center style={{ width: '15%' }}>
          {data.number ? <Text h2>{data.count}</Text> : <Text>{sharedIcon('rightArrow')}</Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
