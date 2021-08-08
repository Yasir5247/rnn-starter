import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

import Icon1 from 'react-native-vector-icons/AntDesign';
const RightIcon = <Icon1 name="right" size={14} color={'#000'} />;

type TopMenuProps = {
  onPressMenu: (id: number, name: string) => void;
  menuName: string;
  icon?: string;
  rightText?: string;
  bg?: boolean;
  data: { id: number; name: string };
};

export const TopMenu: React.FC<TopMenuProps> = ({
  onPressMenu,
  icon,
  rightText,
  menuName,
  bg,
  data,
}) => {
  const S = { 'bg-bg2Color': bg, 'paddingH-m': bg, 'paddingV-10': bg };

  const style = {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomWidth: 0.5,
    borderColor: '#CCD6DD',
  };

  return (
    <TouchableWithoutFeedback onPress={() => onPressMenu(data?.id, data?.name)}>
      <View flex-1 row {...S} style={style}>
        <View flex-1 row left>
          <View>
            <Text>{icon}</Text>
          </View>
          <View>
            <Text h1> {menuName}</Text>
          </View>
        </View>
        <View flex-1 row right>
          <Text>
            {rightText
              ? typeof rightText === 'number'
                ? rightText
                : rightText.substring(0, 15)
              : RightIcon}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
