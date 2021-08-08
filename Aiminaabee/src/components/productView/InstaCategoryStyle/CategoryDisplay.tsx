import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import { ImageLoader } from '../../comon/ImageLoader';

//types
import { MagicFeed_magicFeed_Category } from '../../../requests/__generated__/MagicFeed';

interface CategoryDisplay {
  data: MagicFeed_magicFeed_Category;
  actions: {
    onCatPress: (catId: number, catName: string) => void;
  };
}

export const CategoryDisplay: React.FC<CategoryDisplay> = ({ data, actions }) => {
  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={() => actions.onCatPress(data.id, data.name)}>
        <View style={styles.innerContainer}>
          <ImageLoader
            style={{ width: '100%', height: '100%' }}
            imageStyle={{ borderRadius: 25 }}
            source={{ uri: data.image }}
          />
          <View style={styles.categoryNameBox}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.catTextHStyle}>Browse</Text>
              <Text style={styles.catTextStyle}>{data.name}</Text>
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
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  innerContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
    height: 440,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  categoryNameBox: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  catTextHStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  catTextStyle: {
    fontSize: 30,
    color: '#fff',
  },
});
