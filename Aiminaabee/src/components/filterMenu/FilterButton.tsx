import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';

interface FilterButtonProps {
  actions: {
    onPressFilter: () => void;
    onPressReset: () => void;
  };
}

export const FilterButton: React.FC<FilterButtonProps> = ({ actions }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => actions.onPressReset()}>
        <View style={[styles.resetButton, styles.centerStyle]}>
          <Text style={styles.buttonText}>Reset</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => actions.onPressFilter()}>
        <View style={[styles.filterButton, styles.centerStyle]}>
          <Text style={styles.buttonText}>Filter</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    height: 65,
  },
  resetButton: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderColor: '#000',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  filterButton: {
    flex: 1,
    padding: 5,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  centerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
