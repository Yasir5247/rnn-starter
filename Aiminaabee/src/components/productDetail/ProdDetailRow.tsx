import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import Feather from 'react-native-vector-icons/Feather';

interface ProdDetailRowProps {
  data: {
    id: number;
    heading: string;
    icon?: boolean;
  };
  actions: {
    onPressMenu: (id: number) => void;
  };
}

export const ProdDetailRow: React.FC<ProdDetailRowProps> = ({ data, actions }) => {
  return (
    <TouchableWithoutFeedback onPress={() => actions.onPressMenu(data.id)}>
      <View row bg-bgColor padding-15 style={{ borderBottomWidth: 2, borderColor: '#f2f2f2' }}>
        <View flex-1>
          <Text h1>{data.heading}</Text>
        </View>
        <View flex-1 right marginL-15>
          <Feather name={data.icon ? 'message-circle' : 'chevron-right'} size={20} color={'#000'} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    marginLeft: 15,
  },
  leftSideText: {
    fontSize: 18,
    color: '#000',
  },
  rightSideText: {
    color: '#000',
    fontSize: 18,
  },
});
