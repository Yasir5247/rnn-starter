import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';

import { useQuery } from '@apollo/client';
import { GET_MAIN_CATEGORIES_SHOP_RELATED_SELECTION } from '../../requests/categories';

import { ImageLoader } from '../../components/comon/ImageLoader';

//Services
import { useServices } from '../../services';

//custom hooks
import { shopRegisterMutations } from '../../localState/shopCreateTemp';

//Navigation
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//icons
import { sharedIcon } from '../../utils/icons';

export const ShopRelatedCategoryScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //state
  const [categories, setCategories]: any = useState([]);
  const [categoryId, setCategoryId]: any = useState(1);

  //local state
  const { updateShopTemp } = shopRegisterMutations;

  const Elert = (action: string) => {
    Alert.alert(action);
  };

  //button press
  useNavigationButtonPress(
    () => {
      if (categoryId !== null) {
        _save_move();
        nav.push(componentId, 'ShopContactScreen');
      } else {
        Elert('You must select a category first');
      }
    },
    componentId,
    'next',
  );

  const { loading, data } = useQuery(GET_MAIN_CATEGORIES_SHOP_RELATED_SELECTION, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const relatedCat = data.mainCategories.map((x: any) => {
        return { ...x, selected: false };
      });
      setCategories([...relatedCat]);
    },
    notifyOnNetworkStatusChange: true,
  });

  const _save_move = () => {
    console.log('categoryId=', categoryId);
    updateShopTemp({ categoryId: categoryId });
  };

  const _handleCategorySelection = (id: number) => {
    console.log('id', id);
    console.log('categoryId', categories);

    let temp = categories.map((x: any) => {
      if (x.id === id) {
        console.log('x.id', x.id);
        console.log('categoryId', categoryId);
        setCategoryId(x.id);
        return {
          ...x,
          selected: x.selected ? x.selected : !x.selected,
        };
      }
      return {
        ...x,
        selected: false,
      };
    });
    setCategories([...temp]);
  };

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View style={styles.container}>
      <View>
        {categories.length ? (
          categories.map((x: any) => (
            <TouchableWithoutFeedback onPress={() => _handleCategorySelection(x.id)}>
              <View style={styles.categoryBox}>
                <View>
                  <ImageLoader
                    style={{ width: 50, height: 50 }}
                    imageStyle={{ borderRadius: 100 }}
                    source={{ uri: x.image }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    alignContent: 'center',
                  }}>
                  <Text style={{ color: '#fff' }}> {x.name}</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    alignContent: 'center',
                  }}>
                  {x.selected ? (
                    <Text>{sharedIcon('check')}</Text>
                  ) : (
                    <Text>{sharedIcon('remove')}</Text>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <View>
            <Text>No Categories</Text>
          </View>
        )}
      </View>
    </View>
  );
};

ShopRelatedCategoryScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
    },
  },
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    padding: 10,
  },
  categoryBox: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#23272A',
    padding: 15,
    marginBottom: 5,
  },
});
