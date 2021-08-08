import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl, Text } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { View } from 'react-native-ui-lib';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

//services
import { useServices } from '../../services';

//query
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_RELATED_SHOPS } from '../../requests/shop';

//components
import { RelatedShopsGrid } from '../../components/shop/RelatedShopsGrid';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

const LIMIT = 20;

export const RelatedShopScreen: NavigationFunctionComponent = ({
  componentId,
  shopCategoryId,
}: any) => {
  //services
  const { nav, t } = useServices();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(GET_RELATED_SHOPS, {
    variables: { categoryId: shopCategoryId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.getRelatedShops) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.getRelatedShops);
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(12));

  const handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProvider.getSize()) {
      fetchMore({
        variables: {
          offset: dataProvider.getSize(),
          limit: LIMIT,
        },
        updateQuery: (pqr, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            getRelatedShops: [...pqr.getRelatedShops, ...fetchMoreResult.getRelatedShops],
          };
        },
      });
    }
  };

  const rowRenderer = (type: any, data: any) => {
    return (
      <RelatedShopsGrid
        data={{
          shopId: data.id,
          shopName: data.name,
          shopPicture: data.picture,
          isShopVerified: data.isVerified,
          isShopFollowed: data.isShopFollowed,
        }}
        actions={{
          showShop: (shopId: number, shopName: string) =>
            nav.pushWithTitle(componentId, 'ShopScreen', shopName, {
              shopId,
            }),
          followShop: () => null,
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
    <View flex-1 paddingH-5 bg-bgColor>
      {dataProviderWithData.current.getSize() ? (
        <RecyclerListView
          style={{ flex: 1 }}
          onEndReached={handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          renderFooter={_renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === NetworkStatus.refetch}
              onRefresh={() => refetch({ offset: 0, limit: LIMIT })}
              colors={['#EA0000']}
              tintColor="white"
              title="loading..."
              titleColor="white"
              progressBackgroundColor="white"
            />
          }
        />
      ) : (
        <EmptyScreen title="no related shops" />
      )}
    </View>
  );
};

RelatedShopScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
