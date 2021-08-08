import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
const locationIcon = <Icon name="location-on" size={15} color={'#fff'} />;


interface NearShopsHeaderTypes {
  isShop?: boolean;
}

export const NearShopsHeader: React.FC<NearShopsHeaderTypes> = ({ isShop }: any) => {

  const content = (<Text style={styles.textStyle}>{isShop ? 'Explore shops near you' : 'No shops near you'}</Text>);

  return (
    <View style={styles.container}>
      <View style={styles.nearShopsHeader}>
        <View style={[styles.iconBox, styles.centerStyle]}>
          {locationIcon}
        </View>
        <View style={styles.contentBox}>
          {content}
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 5,
    // borderWidth: 1, borderColor: 'blue',
  },
  nearShopsHeader: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  iconBox: {
    padding: 10,
    borderRightWidth: 1, borderColor: '#999'
  },
  contentBox: {
    padding: 10
  },
  textStyle: {
    color: '#fff'
  },
  centerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
})
