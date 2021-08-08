import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

//icons
import { sharedIcon } from '../../utils/icons';

interface OrderLogsCard {
  data: {
    orderId: number;
  };
  actions: {
    onPressLog: (orderId: number) => void;
  };
}

export const OrderLogsCard: React.FC<OrderLogsCard> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.left}>
          <Text style={{ color: '#ccc', fontSize: 14 }}>Order Activity</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => actions.onPressLog(data.orderId)}>
          <View style={styles.right}>
            <Text>{sharedIcon('info')}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#23272A',
    padding: 15,
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    marginLeft: 15,
  },
});
