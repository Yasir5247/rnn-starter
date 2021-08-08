import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { CategoryGrid } from '../../components/productView/categoryGrid/CategoryGrid';
import { SubCatScroller } from '../../components/category/subCatScroller';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//custom hooks
import { useToggleLike, useToggleBookmark } from '../../requests/mutations/product';

//services
import { useServices } from '../../services';

import { CATEGORY_FEED } from '../../requests/categoryFeed';

const LIMIT = 10;

export const AllProductsInCatScreen: NavigationFunctionComponent = ({
  componentId,
  catId,
  subCats,
}: any) => {
  //services
  const { nav, t } = useServices();

  const { mutate: toggleLike } = useToggleLike();
  const { mutate: toggleBookmark } = useToggleBookmark();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(CATEGORY_FEED, {
    variables: { catId: catId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(8));

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.categoryFeed) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.categoryFeed);
  }

  // prettier-ignore
  useNavigationButtonPress(() => nav.push(componentId, 'DiscoverProductScreen'), componentId, 'search');

  const _onEndReached = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          catId: catId,
          offset: dataProviderWithData.current.getSize(),
        },
      });
    }
  };

  const _renderFooter = () => {
    return loading ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
    ) : (
      <View style={{ height: 80 }} />
    );
  };

  const _rowRenderer = (type: any, data: any) => {
    return (
      <CategoryGrid
        data={{
          productId: data.id,
          productName: data.formatedName,
          productPrice: data.formatedPrice,
          productImage: data.defaultImage,
          categoryName: data.category.name,
          isBookmarked: data.isBookmarked,
          isLiked: data.isLiked,
        }}
        actions={{
          toggleLike: (productId: number, status: any) =>
            toggleLike({ variables: { productId, status } }),
          toggleBookmark: (productId: number, status: any) =>
            toggleBookmark({ variables: { productId, status } }),
          showProduct: (prodId: number, prodName: string) =>
            nav.pushWithTitle(componentId, 'ProductDetailScreen', prodName, {
              prodId,
            }),
        }}
      />
    );
  };

  return (
    <View flex-1 bg-bgColor>
      <View center bg-bgColor row>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {subCats &&
            subCats.map((data: any) => (
              <SubCatScroller
                key={data.id}
                data={{
                  categoryId: data.id,
                  categoryName: data.name,
                }}
                actions={{
                  onSubCatPress: (categoryId: number, categoryName: string) => {
                    nav.pushWithTitle(componentId, 'AllProductsInSubCatScreen', categoryName, {
                      subCatId: categoryId,
                      subCatName: categoryName,
                    });
                  },
                }}
              />
            ))}
        </ScrollView>
      </View>
      <View flex-1 bg-bgColor>
        {dataProviderWithData.current.getSize() ? (
          <RecyclerListView
            style={{ flex: 1 }}
            dataProvider={dataProviderWithData.current}
            onEndReached={_onEndReached}
            rowRenderer={_rowRenderer}
            layoutProvider={layoutProvider}
            onEndReachedThreshold={10}
            renderFooter={_renderFooter}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={networkStatus === NetworkStatus.refetch}
                onRefresh={() => refetch({ offset: 0, limit: LIMIT, catId: null })}
                colors={['#EA0000']}
                tintColor="white"
                title="loading..."
                titleColor="white"
                progressBackgroundColor="white"
              />
            }
          />
        ) : (
          <EmptyScreen title={'no products in this category'} />
        )}
      </View>
    </View>
  );
};

AllProductsInCatScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
