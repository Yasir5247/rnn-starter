import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';

interface CatSortModalProps {
  actions: {
    handleSort: (sort: any) => void;
  };
}

export const CatSortModal: React.FC<CatSortModalProps> = ({ actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Sort</Text>
      </View>
      <View style={styles.sortContainer}>
        <TouchableWithoutFeedback onPress={() => actions.handleSort('ASC')}>
          <View style={styles.sortRow}>
            <Text style={styles.sortText}> Price: Low to High</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => actions.handleSort('DESC')}>
          <View style={styles.sortRow}>
            <Text style={styles.sortText}> Price: High to Low</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerBox: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#f2f2f2',
  },
  sortContainer: {
    padding: 10,
  },
  sortRow: {
    padding: 10,
  },
  sortText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
});
