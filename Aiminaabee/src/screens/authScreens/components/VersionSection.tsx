import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const VersionSection = () => {
  return (
    <View style={[styles.container, styles.centerStyle]}>
      <Text style={{color: '#fff', fontSize: 20}}>Beta Version</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 5,
  },
  centerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default VersionSection;
