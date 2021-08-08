import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { isEmpty } from 'lodash';

const FilterList = ({ categoryData, currentFilter, level, onPress }) => {
  // From selected filter or new selected filter, find all parents and push it to activeParentCategories array.
  // If exists in activeParentCategories children visible
  const [activeParentCategories, setActiveParentCategories] = useState([]);

  useEffect(() => {
    getActiveParents(categoryData, currentFilter.categoryId);
  }, [currentFilter]);

  const isParent = (category, parents, targetId) => {
    if (!category) return false;

    parents.push(category.id);

    if (category.id === targetId) return true;

    if (
      category.subCats &&
      category.subCats.some((subcat) => {
        return isParent(subcat, parents, targetId);
      })
    ) {
      return true;
    }
    parents.pop();
    return false;
  };

  const getActiveParents = (filters, targetId) => {
    const activeParents = [];
    filters.forEach((item) => {
      if (isParent(item, activeParents, targetId)) {
        return true;
      }
    });
    setActiveParentCategories(activeParents);
  };

  const Title = ({ category }) => {
    return (
      <TouchableOpacity onPress={() => onPress(category)}>
        <View style={styles.titleView}>
          <View
            style={[
              styles.uncheckRadioBtn,
              {
                backgroundColor: currentFilter?.categoryId === category.id ? 'blue' : '#fff',
              },
            ]}>
            {currentFilter?.categoryId === category.id && <View style={styles.checkRadioBtn} />}
          </View>
          <Text style={styles.title}>{category.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const shouldExpand = (category, currentLevel) => {
    let expand = false;
    // If no category selected, expand upto 2 levels
    if (isEmpty(currentFilter) && currentLevel < 2) {
      expand = true;
    }
    // If some category selected, expand that list
    if (activeParentCategories.includes(category.id)) {
      expand = true;
    }
    return expand;
  };

  return (
    <View>
      {categoryData.map((category, index) => {
        const { subCats } = category;
        return (
          <View style={styles.menu} key={index}>
            <Title category={category} />
            {subCats?.length > 0 && shouldExpand(category, level) && (
              <FilterList
                categoryData={subCats}
                currentFilter={currentFilter}
                onPress={onPress}
                level={level + 1}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default FilterList;

const styles = StyleSheet.create({
  menu: {
    paddingLeft: 22,
    paddingVertical: 5,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 15,
    marginVertical: 3,
    fontSize: 17,
  },
  uncheckRadioBtn: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkRadioBtn: {
    width: 8,
    height: 8,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
});
