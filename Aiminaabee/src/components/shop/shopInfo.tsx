import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ShopInfoProps {
  data: {
    shopId: number;
    shopName: string;
    shopDesc: string;
    shopWebsite: string;
    shopContact: string;
  };
}

export const ShopInfo: React.FC<ShopInfoProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.basicInfor}>
        <Text style={styles.shopDetailText}>{data.shopName}</Text>
        <Text style={styles.shopDetailText}>{data.shopDesc.substring(0, 50)}</Text>
        <Text>
          <Text style={styles.shopDetailHeadingText}>phone: </Text>
          <Text style={[styles.shopDetailText, { fontWeight: 'bold' }]}>{data.shopContact}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderColor: '#000',
  },
  basicInfor: {
    height: 80,
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    // borderWidth: 1,
    // borderColor: '#000',
  },
  shopDetailText: {
    fontSize: 14,
    color: '#000',
  },
  shopDetailHeadingText: {
    fontSize: 14,
    color: '#000',
  },
});
