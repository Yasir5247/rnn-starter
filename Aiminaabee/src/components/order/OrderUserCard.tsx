import React from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import { sharedIcon } from '../../utils/icons';

interface OrderUserCardProps {
  data: {
    userId: number;
    userName: string;
    userImage: string;
    shopContact: string;
  };
}

export const OrderUserCard: React.FC<OrderUserCardProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{ width: 40, height: 40, borderRadius: 100 }}
          source={{ uri: data.userImage }}
        />
      </View>
      <View style={styles.center}>
        <Text style={{ color: '#ccc', fontSize: 14 }}>{data.userName}</Text>
        <Text style={{ color: '#ccc', fontSize: 12 }}>Contact {data.shopContact}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => null}>
        <View style={styles.right}>{sharedIcon('chat')}</View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#23272A',
    padding: 15,
    marginTop: 10,
  },
  cardContainer: {
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
    marginLeft: 15,
  },
  right: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
  },
});
