import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ShippingStatusCard: React.FC<{ shippingStatus: string }> = ({ shippingStatus }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#ccc', fontSize: 14 }}>Status</Text>
        </View>
        <View style={styles.right}>
          <Text style={{ color: '#ccc', fontSize: 14, marginRight: 10 }}>{shippingStatus}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#23272A',
    padding: 15,
  },
  right: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    marginLeft: 15,
  },
});
