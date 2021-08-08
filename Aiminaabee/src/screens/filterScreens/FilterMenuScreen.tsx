import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

//queries
import { useQuery } from '@apollo/client';
import { GET_SLECTED_CATEGORY } from '../../localState/FilterCategoryTemp/queries';
import { categoryFilterMutions } from '../../localState/FilterCategoryTemp';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//services
import { useServices } from '../../services';

//components
import { FilterRow } from '../../components/filterMenu/FilterRow';
import { FilterButton } from '../../components/filterMenu/FilterButton';

//icons
import Icon from 'react-native-vector-icons/Feather';
const categoryIcon = <Icon name="hash" size={20} color={'#000'} />;

export const FilterMenuScreen: NavigationFunctionComponent = ({
  componentId,
  parentCatId,
  parentCatName,
  setFilters,
}: any) => {
  //services
  const { nav, t } = useServices();

  //local state
  const tempResults = useQuery(GET_SLECTED_CATEGORY);
  const selectedCategory = tempResults.data.filterCategoryTemp;
  const { clearCategoryTemp } = categoryFilterMutions;

  //button press
  //useNavigationButtonPress(() => nav.pop(componentId), componentId, 'cancelFilter')

  useEffect(() => {
    //setting the selected filter in products screen before screen pops
    return () => {
      if (selectedCategory.categoryId) {
        setFilters(selectedCategory);
      } else {
        setFilters({
          categoryId: parentCatId,
          categoryName: parentCatName,
        });
      }
    };
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        <FilterRow
          data={{
            title: 'Category',
            selectedCat: selectedCategory ? selectedCategory : '',
            menuIcon: categoryIcon,
          }}
          actions={{
            onPressUserMenu: () => {
              if (selectedCategory.categoryId) {
                nav.pushWithTitle(componentId, 'FilterListScreen', selectedCategory.categoryName, {
                  subCatId: selectedCategory.categoryId,
                  subCatName: selectedCategory.categoryName,
                  parentCatId,
                });
              } else {
                nav.pushWithTitle(componentId, 'FilterListScreen', parentCatName, {
                  subCatId: parentCatId,
                  subCatName: parentCatName,
                  parentCatId,
                });
              }
            },
          }}
        />
      </View>
      <View>
        <FilterButton
          actions={{
            onPressFilter: () => nav.pop(componentId),
            onPressReset: () => clearCategoryTemp(),
          }}
        />
      </View>
    </SafeAreaView>
  );
};

FilterMenuScreen.options = {
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
  },
});
