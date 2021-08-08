import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

type LoginSectionProps = {
  handleLogin: () => void;
};

export const LoginSection: React.FC<LoginSectionProps> = ({ handleLogin }) => {

  return (
    <View center padding-15 bg-grey>
      <Text>
        <Text h1 black>Already have an account? </Text>
        <TouchableWithoutFeedback onPress={handleLogin}>
          <Text red>Log in </Text>
        </TouchableWithoutFeedback>
      </Text>
    </View>
  );
}