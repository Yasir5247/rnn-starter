import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import LinearGradient from 'react-native-linear-gradient';

type SectionProps = {
  borderRadius?: number;
  children: React.ReactNode;
};

export const Section: React.FC<SectionProps> = ({ children, borderRadius }: SectionProps) => {
  return (
    <View>
      <LinearGradient
        style={{
          borderRadius: borderRadius,
        }}
        colors={['blue', 'tomato']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}>
        {children}
      </LinearGradient>
    </View>
  );
};
