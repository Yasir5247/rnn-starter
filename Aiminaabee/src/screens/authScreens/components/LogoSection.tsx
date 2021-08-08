import React from 'react';
import { View, Text, Image } from 'react-native-ui-lib';

type LogoSectionProps = {
  appName: string;
  appDescription: string;
};


export const LogoSection: React.FC<LogoSectionProps> = ({ appName, appDescription }) => {

  return (
    <View flex-1 center bg-white>
      <Image assetName="appIcon" style={{ width: 100, height: 100 }} />
      <Text h3 black marginT-10>{appName}</Text>
      <Text h1 black>{appDescription}</Text>
    </View>
  );
}
