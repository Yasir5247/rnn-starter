import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TouchableWithoutFeedback,
   ActivityIndicator,
   ScrollView,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import { theme } from '../../Styles/theme';
import * as func from '../../../utility/utilFuncs';

import { useQuery, useApolloClient } from '@apollo/client';

import { GET_SUBCATEGORIES } from '../../../requests/categories';
import { GET_CATEGORY } from '../../../requests/categories';

import { categoryFilterMutions } from '../../../LocalState/FilterCategoryTemp';

import Icon from 'react-native-vector-icons/AntDesign';
const rightIcon = <Icon name="right" size={18} color="#000" />;



const FilterCatScreen = ({ componentId, catId }) => {

   //state
   const [categories, setCategories] = useState([]);

   //update local state
   const { updateCategory } = categoryFilterMutions;

   const apolloClient = useApolloClient();

   //queries
   const { loading: categoryLoading, data: categoryData } = useQuery(
      GET_CATEGORY,
      { variables: { catId: catId } },
   );
   const { loading } = useQuery(GET_SUBCATEGORIES, {
      variables: { catId: catId },
      onCompleted: data => {
         const tempCategories = [];
         data.getSubCategories.map(x => {
            tempCategories.push({ ...x });
         });
         setCategories([...tempCategories]);
      },
      fetchPolicy: 'network-only',
   });

   if (loading) {
      return (
         <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />
      );
   }

   if (categoryLoading) {
      return (
         <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />
      );
   }

   const _renderBreadCrapm = categories => {
      if (categories.length > 0) {
         if (categories[0].isSubCat) {
            return (
               <TouchableWithoutFeedback
                  onPress={async () => {
                     const subcats = await apolloClient.query({
                        query: GET_SUBCATEGORIES,
                        variables: { catId: catId },
                     });
                     if (subcats.data.getSubCategories.length) {
                        setCategories([...subcats.data.getSubCategories]);
                     }
                  }}>
                  <View style={styles.breadCrampRow}>
                     <View
                        style={{
                           flex: 1,
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}>
                        <Text style={styles.breadCrampText}>
                           {' '}
                           all in {categoryData?.getCategory.category_name}
                        </Text>
                     </View>
                  </View>
               </TouchableWithoutFeedback>
            );
         } else {
            return (
               <TouchableWithoutFeedback
                  onPress={async () => {
                     const subcats = await apolloClient.query({
                        query: GET_SUBCATEGORIES,
                        variables: { catId: catId },
                     });
                     if (subcats.data.getSubCategories.length) {
                        setCategories([...subcats.data.getSubCategories]);
                     }
                  }}>
                  <View style={styles.breadCrampRow}>
                     <View
                        style={{
                           flex: 1,
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}>
                        <Text style={styles.breadCrampText}>
                           {' '}
                           all in {categoryData?.getCategory.category_name}
                        </Text>
                     </View>
                  </View>
               </TouchableWithoutFeedback>
            );
         }
      }
   };

   const _retrieveSubCats = async catId => {
      const subcats = await apolloClient.query({
         query: GET_SUBCATEGORIES,
         variables: { catId: catId },
      });
      if (subcats.data.getSubCategories.length) {
         setCategories([...subcats.data.getSubCategories]);
      }
   };

   const _selected = selectedCat => {
      //update local state with user selected category
      updateCategory({
         categoryId: selectedCat.id,
         categoryName: selectedCat.name,
      });
      Navigation.pop(componentId);
   };

   return (
      <ScrollView style={styles.container}>
         {_renderBreadCrapm(categories)}
         <View style={styles.catContainer}>
            {categories.map(cat => (
               <TouchableWithoutFeedback
                  onPress={
                     cat.isSubCat
                        ? () => _retrieveSubCats(cat.id)
                        : () => _selected(cat)
                  }>
                  <View style={styles.categoryRow}>
                     <View
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.categoryText}>
                           {func.stringCutter(cat.name, 30)}
                        </Text>
                     </View>
                     <View>{cat.isSubCat ? <Text>{rightIcon}</Text> : null}</View>
                  </View>
               </TouchableWithoutFeedback>
            ))}
         </View>
      </ScrollView>
   );
};

FilterCatScreen.options = {
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
   catContainer: {
      flex: 2,
      borderTopWidth: 0.5,
      borderColor: '#000',
      backgroundColor: '#fff',
   },
   categoryRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: '#000',
      padding: 20,
   },
   categoryText: {
      fontSize: 26,
      fontWeight: 'bold',
      fontFamily: theme.DEFAULT_FONT_BOLD,
      color: '#000',
   },
   //breadCramp
   breadCrampRow: {
      borderBottomWidth: 0.5,
      borderColor: '#000',
      backgroundColor: '#2C2F33',
      flexDirection: 'row',
      padding: 15,
   },
   breadCrampText: {
      fontSize: 14,
      fontFamily: theme.DEFAULT_FONT_MEDIUM,
      color: '#CCC',
   },
});

export default FilterCatScreen;
