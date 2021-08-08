import React, { useState, useRef } from 'react';
import { RefreshControl } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

//query
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { SEARCH_PRODUCTS } from '../../requests/search';

//services
import { useServices } from '../../services';

//components
import { ProductRow } from '../../components/appRows/product/ProductRow';
import { SearchBox } from '../../components/comon/SearchBox';

const LIMIT = 20;

export const DiscoverProducts: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  const [query, setQuery] = useState<string>('');

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(SEARCH_PRODUCTS, {
    variables: { offset: 0, limit: LIMIT },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.searchProducts) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.searchProducts);
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(4));

  const handleListEnd = () => {
    console.log('hellow', dataProviderWithData.current.getSize());
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          offset: dataProviderWithData.current.getSize(),
        },
      });
    }
  };

  const rowRenderer = (type: any, data: any) => {
    return (
      <ProductRow
        data={{
          productId: data.id,
          productName: data.name,
          productImage: data.defaultImage,
          shopId: data.shop.id,
          shopName: data.shop.name,
          categoryId: data.category.id,
          categoryName: data.category.name,
        }}
        actions={{
          onCategoryPress: (categoryId: number, categoryName: string) => {
            nav.pushWithTitle(componentId, 'ProductsInSubCat', catName, {
              subCatId: categoryId,
              subCatName: categoryName,
            });
          },
          onShopPress: (shopId: number, shopName: string) => {
            nav.pushWithTitle(componentId, 'ShopScreen', shopName, {
              shopId,
            });
          },
          onProductPress: (productId: number, productName: string) => {
            nav.pushWithTitle(componentId, 'ProductDetailScreen', productName, {
              productId,
            });
          },
        }}
      />
    );
  };

  return (
    <View flex-1 bg-bgColor>
      <SearchBox
        data={{
          query: query,
          loadingStatus: loading,
          placeholder: 'search products',
        }}
        actions={{
          searchQueryHandler: (query: string) => {
            setQuery(query);
            refetch({ searchQuery: query });
          },
        }}
      />
      <RecyclerListView
        style={{ flex: 1 }}
        onEndReached={handleListEnd}
        onEndReachedThreshold={10}
        dataProvider={dataProviderWithData.current}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() => refetch({ offset: 0, limit: LIMIT })}
            colors={['#EA0000']}
            tintColor="#000"
            title="loading..."
            titleColor="#000"
            progressBackgroundColor="white"
          />
        }
      />
    </View>
  );
};

DiscoverProducts.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
