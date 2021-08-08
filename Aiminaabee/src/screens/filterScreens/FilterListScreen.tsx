import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

//navigation
// import { loadFilterCatScreen } from '../../../navigation/ScreenFuncs/OtherFuncs/filterScreenFuncs';
// import { loadAllProductsInSubCatScreen } from '../../../navigation/ScreenFuncs/OtherFuncs/catFuncs';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//services
import { useServices } from '../../services';

//queries
import { useQuery } from '@apollo/client';
import { FILTER_CATEGORIES } from '../../requests/categories';

import { categoryFilterMutions } from '../../localState/FilterCategoryTemp';

//components
import FilterList from '../../components/filterMenu/FilterList';

export const FilterListScreen: NavigationFunctionComponent = ({
  componentId,
  subCatId,
  subCatName,
  parentCatId,
}: any) => {
  //services
  const { nav, t } = useServices();

  //local state
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  //update local state
  const { updateCategory } = categoryFilterMutions;

  //button press
  //useNavigationButtonPress(() => nav.pop(componentId), componentId, 'cancelFilter')

  //queries
  const { loading: categoryLoading } = useQuery(FILTER_CATEGORIES, {
    variables: { catId: parentCatId },
    onCompleted: (data) => {
      const { filterCategories } = data;
      setCategoryData(filterCategories);
      setLoading(false);
    },
  });

  const [currentFilter, setCurrentFilter] = useState<{ categoryId: number; categoryName: string }>({
    categoryId: subCatId,
    categoryName: subCatName,
  });

  const onPress = (filter: any) => {
    currentFilter.categoryId === filter.id
      ? setCurrentFilter({ categoryId: 0, categoryName: '' })
      : setCurrentFilter({ categoryId: filter.id, categoryName: filter.name });
  };

  const applyFilter = () => {
    const { categoryId, categoryName } = currentFilter;
    updateCategory({
      categoryId,
      categoryName,
    });
    nav.pop(componentId);
  };

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <FilterList
          categoryData={categoryData}
          currentFilter={currentFilter}
          onPress={onPress}
          level={1}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
          <Text style={styles.applyButtonText}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

FilterListScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    flex: 1,
    padding: 15,
  },
  buttonContainer: {
    // borderWidth: 1, borderColor: 'green',
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 5,
  },
  applyButton: {
    paddingVertical: 10,
    borderRadius: 25,
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
});
