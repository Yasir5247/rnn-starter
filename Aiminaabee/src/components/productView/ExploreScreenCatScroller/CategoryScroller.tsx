import React from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';

//types
import { MainCategories_mainCategories } from '../../../requests/__generated__/MainCategories';

//components
import { ScrollContainer } from './ScrollContainer';

interface CategoryScrollerProps {
  data: MainCategories_mainCategories[];
  actions: {
    showCatScreen: (catId: number, categoryName: string, subCats: any) => void;
  };
}

export const CategoryScroller: React.FC<CategoryScrollerProps> = ({ data, actions }) => {
  return (
    <View flex-1 row bg-bgColor>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data?.map((data: MainCategories_mainCategories, index: any) => (
          <ScrollContainer key={index} data={data} {...actions} />
        ))}
      </ScrollView>
    </View>
  );
};
