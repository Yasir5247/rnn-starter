import React from 'react';
import { View, Text } from 'react-native-ui-lib';

type SectionProps = {
  children: React.ReactNode;
  title?: string;
  bg?: boolean;
};

export const ProfileSection: React.FC<SectionProps> = ({ children, title, bg }: SectionProps) => {
  const S = { 'bg-bgColor': bg, 'paddingH-xs': bg, 'paddingV-s': bg };

  return (
    <View marginB-10 br10 bg-greyish>
      <View {...S}>{children}</View>
    </View>
  );
};
