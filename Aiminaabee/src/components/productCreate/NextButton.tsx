import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

interface NextButtonTypes {
  data: {
    isImage: boolean;
  };
  actions: {
    onPressSelectedShop: () => void;
  };
}

export const NextButton: React.FC<NextButtonTypes> = ({ data, actions }) => {
  return (
    <View flex-1 bg-bgColor padding-10>
      <TouchableWithoutFeedback
        disabled={!data.isImage}
        onPress={() => actions.onPressSelectedShop()}>
        <View style={!data.isImage ? styles.nextButtonLight : styles.nextButtonDark}>
          <Text style={!data.isImage ? styles.nextButtonTextLight : styles.nextButtonTextDark}>
            Next
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  nextButtonLight: {
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  nextButtonDark: {
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'blue',
  },
  nextButtonTextLight: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#ccc',
  },
  nextButtonTextDark: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
  },
});
