import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { ImageLoader } from '../comon/ImageLoader';

interface CatSummaryViewProps {
  data: {
    categoryId: number;
    categoryName: string;
    categoryImage: string;
  };
  actions: {
    showCat: (categoryId: number, categoryName: string) => void;
  };
}

export const CatSummaryView: React.FC<CatSummaryViewProps> = ({ actions, data }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => actions.showCat(data.categoryId, data.categoryName)}>
        <View style={styles.innerContainer}>
          <ImageLoader
            style={{ width: '100%', height: '100%' }}
            imageStyle={{ borderRadius: 0 }}
            source={{ uri: data.categoryImage }}
          />
          <View style={styles.categoryNameBox}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.catTextHStyle}>Brows</Text>
              <Text style={styles.catTextStyle}>{data.categoryName}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // borderWidth: 1, borderColor: '#000'
  },
  innerContainer: {
    marginBottom: 5,
  },
  categoryNameBox: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  catTextHStyle: {
    fontSize: 20,
    color: '#000',
    textShadowColor: '#fff',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  catTextStyle: {
    fontSize: 30,
    color: '#000',
    textShadowColor: '#fff',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});
