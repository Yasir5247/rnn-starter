import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface EmptyScreenProps {
  title: string;
}

export const EmptyScreen: React.FC<EmptyScreenProps> = ({ title }: EmptyScreenProps) => {
  return (
    <View style={styles.container}>
      <Icon name="eye-off-outline" size={30} color="#000" />
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
