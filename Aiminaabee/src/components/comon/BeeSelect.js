import React, { useReducer, useEffect } from 'react';
import _ from 'lodash';
import { View, Text, StyleSheet } from 'react-native';
import { Picker, Colors } from 'react-native-ui-lib';

export const BeeSelect = ({ label, onValueChange, onTouchError, onErrors, value, options }) => {
  return (
    <View style={styles.formControl}>
      <Picker
        topBarProps={{ title: 'Product Condition' }}
        value={value}
        onChange={(item) => onValueChange({ value: item.id, label: item.label })}
        showSearch
        searchPlaceholder={'Search a condition'}
        style={styles.pickerStyle}
        searchStyle={{ color: Colors.blue30, placeholderTextColor: Colors.dark50 }}
        placeholder={label}
        floatingPlaceholder
        enableModalBlur={false}>
        {_.map(options, (option) => (
          <Picker.Item key={option.value} value={option} disabled={option.disabled} />
        ))}
      </Picker>
      {onTouchError && onErrors && onErrors?.value ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{onTouchError?.value && onErrors?.value}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    // borderWidth: 1, borderColor: 'green'
  },
  errorContainer: {
    marginVertical: 5,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
  pickerStyle: {},
});
