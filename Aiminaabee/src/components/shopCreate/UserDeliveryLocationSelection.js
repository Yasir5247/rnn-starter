import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

//Icons
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const locationIcon = <Icon name="location-pin" size={20} color="#fff" />;

import Icon3 from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon3 name="plus" size={20} color="#fff" />;

const userDeliveryLocationShopSelection = ({ onPressSelectedLocation, selectedName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.iconContainer}>
          <Text>{locationIcon}</Text>
        </View>
        <View style={styles.selectedNameContainer}>
          <Text style={styles.selectedText}>{selectedName}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onPressSelectedLocation.bind(this)}>
          <View style={styles.selectIconContainer}>
            <Text>{plusIcon}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#23272A',
    borderRadius: 8,
    marginBottom: 5,
    // borderWidth: 1,
    // borderColor: '#000'
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // borderWidth: 1,
    // borderColor: '#fff'
  },
  selectedNameContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
    // borderWidth: 1,
    // borderColor: '#fff'
  },
  selectIconContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // borderWidth: 1,
    // borderColor: '#fff'
  },
  selectedText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default userDeliveryLocationShopSelection;
