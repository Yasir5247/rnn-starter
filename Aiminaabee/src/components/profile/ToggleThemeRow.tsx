import React, { useState } from 'react';
import { View, Text, Switch, Colors } from 'react-native-ui-lib';

interface ToggleThemeRowProps {
  data: {
    userId: number;
    selectedTheme: string;
    title: string;
    relatedIcon: any;
  };
  actions: {
    onPressUserMenu: () => void;
  };
}

export const ToggleThemeRow: React.FC<ToggleThemeRowProps> = ({ data, actions }) => {
  //state
  const themeStatus = data.selectedTheme === 'light' ? false : true;

  const borderBottomStyle = { borderBottomWidth: 0.5, borderColor: '#f2f2f2' };

  return (
    <View center bg-bgColor flex-1 row paddingV-15 style={borderBottomStyle}>
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
      <View center style={{ width: '20%' }}>
        <Switch
          value={themeStatus}
          onValueChange={() => actions.onPressUserMenu()}
          onColor={'#000'}
          offColor={'#ccc'}
        />
      </View>
    </View>
  );
};
