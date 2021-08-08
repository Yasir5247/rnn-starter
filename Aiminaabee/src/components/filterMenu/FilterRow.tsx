import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

const iconSize = 20;
const iconColor = '#000';

import Icon from 'react-native-vector-icons/AntDesign';
const rightIcon = <Icon name="right" size={iconSize} color={iconColor} />;

interface FilterRowProps {
  data: {
    title: string;
    selectedCat: any;
    menuIcon: JSX.Element;
  };
  actions: {
    onPressUserMenu: () => void;
  };
}

export const FilterRow: React.FC<FilterRowProps> = ({ data, actions }) => {
  return (
    <TouchableWithoutFeedback onPress={() => actions.onPressUserMenu()}>
      <View style={styles.container}>
        <View style={[styles.menuIconBox, styles.allBoxPadding]}>
          <Text>{data.menuIcon}</Text>
        </View>
        <View style={[styles.menuTitleBox, styles.allBoxPadding]}>
          <Text style={styles.menuText}>{data.title}</Text>
          <Text>{data.selectedCat.categoryName.substring(0, 30)}</Text>
        </View>
        <View style={[styles.menuNumberBox, styles.allBoxPadding]}>
          <Text>{rightIcon}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
    borderBottomWidth: 1,
  },
  menuIconBox: {
    width: '15%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // borderWidth: 1, borderColor: '#000'
  },
  menuTitleBox: {
    flex: 1,
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    // borderWidth: 1, borderColor: '#000'
  },
  allBoxPadding: {
    height: 50,
  },
  menuNumberBox: {
    width: '15%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // borderWidth: 1, borderColor: '#000'
  },
  menuText: {
    fontSize: 18,
  },
});
