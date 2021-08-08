import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { useQuery } from '@apollo/client';
import { NetworkStatus } from '@apollo/client';
import { GET_CATEGORY_SUMMARY } from '../../requests/categories';

//components
import { CatSummaryView } from '../../components/category/CatSummaryView';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//services
import { useServices } from '../../services';

const LIMIT = 20;

export const CategorySummaryScreen: NavigationFunctionComponent = ({ componentId, catId }: any) => {
  //services
  const { nav, t } = useServices();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(GET_CATEGORY_SUMMARY, {
    variables: { catId, offset: 0, limit: LIMIT },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.getCategorySummary) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.getCategorySummary,
    );
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(14));

  //useNavigationButtonPress(() => nav.push(componentId, 'DiscoverProductScreen'), componentId, 'search')

  const _handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          offset: dataProviderWithData.current.getSize(),
          limit: LIMIT,
        },
        updateQuery: (pqr, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            getCategorySummary: [...pqr.getCategorySummary, ...fetchMoreResult.getCategorySummary],
          };
        },
      });
    }
  };

  const _rowRenderer = (type: any, data: any) => {
    return (
      <CatSummaryView
        key={data.id}
        data={{
          categoryId: data.id,
          categoryName: data.name,
          categoryImage: data.displayImage,
        }}
        actions={{
          showCat: (categoryId: number, categoryName: string) =>
            nav.pushWithTitle(componentId, 'ProductsInSubCat', categoryName, {
              subCatId: categoryId,
              subCatName: categoryName,
            }),
        }}
      />
    );
  };

  const _renderFooter = () => {
    return loading ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
    ) : (
      <View style={{ height: 80 }} />
    );
  };

  return (
    <View flex-1 bg-bgColor>
      <RecyclerListView
        style={{ flex: 1 }}
        onEndReached={_handleListEnd}
        dataProvider={dataProviderWithData.current}
        layoutProvider={layoutProvider}
        rowRenderer={_rowRenderer}
        renderFooter={_renderFooter}
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

CategorySummaryScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
