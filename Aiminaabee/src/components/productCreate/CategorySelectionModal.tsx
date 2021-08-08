import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import { useQuery, useApolloClient } from '@apollo/client';
import { GET_SUBCATEGORIES } from '../../requests/categories';
import {
  GetSubCategories,
  GetSubCategoriesVariables,
  GetSubCategories_getSubCategories,
} from '../../requests/__generated__/GetSubCategories';

//icon
import { sharedIcon } from '../../utils/icons';

interface CatSelectionModalProps {
  data: {
    categoryId: number;
  };
  actions: {
    onPressCategorySelection: (catId: number, catName: string) => void;
  };
}

export const CategorySelectionModal: React.FC<CatSelectionModalProps> = ({ data, actions }) => {
  //state
  const [categories, setCategories] = useState<any>([]);

  //redux and apollo
  const apolloClient = useApolloClient();

  //main categories
  const { loading, data: subCats } = useQuery(GET_SUBCATEGORIES, {
    variables: { catId: data.categoryId },
    onCompleted: (data) => {
      const tempCategories = data.getSubCategories.map((x: any) => {
        return { ...x };
      });
      setCategories([...tempCategories]);
    },
    fetchPolicy: 'network-only',
  });

  const _renderBreadCrapm = (categories: any) => {
    if (categories.length > 0) {
      if (categories[0].isSubCat) {
        return (
          <TouchableWithoutFeedback
            onPress={async () => {
              const topCats = await apolloClient.query({
                query: GET_SUBCATEGORIES,
                variables: { catId: data.categoryId },
                fetchPolicy: 'network-only',
              });
              if (topCats.data.getSubCategories.length) {
                setCategories([...topCats.data.getSubCategories]);
              }
            }}>
            <View style={styles.breadCrampRow}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.breadCrampText}> MAIN CATEGORIES </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      } else {
        return (
          <TouchableWithoutFeedback
            onPress={async () => {
              const topCats = await apolloClient.query({
                query: GET_SUBCATEGORIES,
                variables: { catId: data.categoryId },
                fetchPolicy: 'network-only',
              });
              if (topCats.data.getSubCategories.length) {
                setCategories([...topCats.data.getSubCategories]);
              }
            }}>
            <View style={styles.breadCrampRow}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.breadCrampText}> MAIN CATEGORIES </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      }
    }
  };

  const _retrieveSubCats = async (catId: number) => {
    const subcats = await apolloClient.query({
      query: GET_SUBCATEGORIES,
      variables: { catId: catId },
      fetchPolicy: 'network-only',
    });
    if (subcats.data.getSubCategories.length) {
      setCategories([...subcats.data.getSubCategories]);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Select Category</Text>
      </View>
      {_renderBreadCrapm(categories)}
      <ScrollView style={{ flex: 1 }}>
        {categories.map((cat: any) => (
          <TouchableWithoutFeedback
            onPress={
              cat.isSubCat
                ? () => _retrieveSubCats(cat.id)
                : //can send full category by sending cat only.
                  //to display the cat details to the user before uploading
                  //im only sending catId
                  () => actions.onPressCategorySelection(cat.id, cat.name)
            }>
            <View style={styles.categoryRow}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.categoryText}> {cat.name}</Text>
              </View>
              <View>{cat.isSubCat ? <Text>{sharedIcon('rightArrow')}</Text> : null}</View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerBox: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#f2f2f2',
  },
  catContainer: {
    borderTopWidth: 0.5,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  categoryRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#000',
    padding: 20,
  },
  categoryText: {
    fontSize: 18,
    color: '#000',
  },
  //breadCramp
  breadCrampRow: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 15,
  },
  breadCrampText: {
    fontSize: 14,
    color: '#000',
  },
});
