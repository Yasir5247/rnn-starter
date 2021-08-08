import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {theme} from '../../Styles/theme';

import {useQuery, useApolloClient} from '@apollo/client';

import {GET_SUBCATEGORIES} from '../../../requests/categories';
import {GET_CATEGORY} from '../../../requests/categories';

import Icon from 'react-native-vector-icons/AntDesign';
const rightIcon = <Icon name="right" size={18} color="#000" />;

const filterCatModal = ({onPressCategorySelection, catId}) => {
  console.log('filterCatModal');

  const [categories, setCategories] = useState([]);
  const apolloClient = useApolloClient();

  const {loading: categoryLoading, data: categoryData} = useQuery(
    GET_CATEGORY,
    {variables: {catId: catId}},
  );

  const {loading} = useQuery(GET_SUBCATEGORIES, {
    variables: {catId: catId},
    onCompleted: data => {
      const tempCategories = [];
      data.getSubCategories.map(x => {
        tempCategories.push({...x});
      });
      setCategories([...tempCategories]);
    },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return (
      <ActivityIndicator style={{margin: 5}} size="large" color={'black'} />
    );
  }

  if (categoryLoading) {
    return (
      <ActivityIndicator style={{margin: 5}} size="large" color={'black'} />
    );
  }

  _renderBreadCrapm = categories => {
    if (categories.length > 0) {
      if (categories[0].isSubCat) {
        return (
          <TouchableWithoutFeedback
            onPress={async () => {
              const subcats = await apolloClient.query({
                query: GET_SUBCATEGORIES,
                variables: {catId: catId},
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
                variables: {catId: catId},
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

  _retrieveSubCats = async catId => {
    const subcats = await apolloClient.query({
      query: GET_SUBCATEGORIES,
      variables: {catId: catId},
    });
    if (subcats.data.getSubCategories.length) {
      setCategories([...subcats.data.getSubCategories]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={{fontSize: 23, fontWeight: 'bold'}}>Select Category</Text>
      </View>
      {_renderBreadCrapm(categories)}
      <View style={styles.catContainer}>
        {categories.map(cat => (
          <TouchableWithoutFeedback
            onPress={
              cat.isSubCat
                ? () => _retrieveSubCats(cat.id)
                : //can send full category by sending cat only.
                  //to display the cat details to the user before uploading
                  //im only sending catId
                  onPressCategorySelection.bind(this, cat.id)
            }>
            <View style={styles.categoryRow}>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.categoryText}> {cat.category_name}</Text>
              </View>
              <View>{cat.isSubCat ? <Text>{rightIcon}</Text> : null}</View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </ScrollView>
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
    flex: 2,
    borderTopWidth: 0.5,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  categoryRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: '#000',
    padding: 20,
  },
  categoryText: {
    fontSize: 26,
    fontFamily: theme.DEFAULT_FONT_BOLD,
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
    fontFamily: theme.DEFAULT_FONT_MEDIUM,
    color: '#000',
  },
});

export default filterCatModal;
