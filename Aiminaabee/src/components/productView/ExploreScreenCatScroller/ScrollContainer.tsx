import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

//components
import { ImageLoader } from '../../../components/comon/ImageLoader';

//types
import { MainCategories_mainCategories } from '../../../requests/__generated__/MainCategories';

interface CategoryScrollerProps {
  data: MainCategories_mainCategories;
  showCatScreen: (catId: number, categoryName: string, subCats: any) => void;
}

export const ScrollContainer: React.FC<CategoryScrollerProps> = ({ data, showCatScreen }) => {
  return (
    <TouchableWithoutFeedback onPress={() => showCatScreen(data.id, data.name, data.subCats)}>
      <View style={styles.CatHolder}>
        <View style={styles.catImageWrapper}>
          <ImageLoader
            style={{ width: '100%', height: '100%', borderRadius: 100 }}
            imageStyle={{ borderRadius: 100 }}
            source={{ uri: data.image }}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text textColor bold h1>
            {data.name.substring(0, 12)}{' '}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  CatHolder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
  catImageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#000',
  },
});
