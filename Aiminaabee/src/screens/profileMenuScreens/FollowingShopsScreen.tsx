import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { View } from 'react-native-ui-lib';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

//query
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { FOLLOWING_SHOPS } from '../../requests/users';

//components
import { ShopsRow } from '../../components/appRows/shop/ShopsRow';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

//services
import { useServices } from '../../services';

//navigation
import { NavigationFunctionComponent } from 'react-native-navigation';

//custom hooks
import { useToggleFollowShop } from '../../requests/mutations/shop';

const LIMIT = 20;

export const FollowingShopScreen: NavigationFunctionComponent = ({ componentId, userId }: any) => {
  //services
  const { nav, t } = useServices();

  //cutom hooks
  const { mutate: toggleFollowShop } = useToggleFollowShop();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(FOLLOWING_SHOPS, {
    variables: { userId: userId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.followingshops) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.followingshops);
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(3));

  const _handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProvider.getSize()) {
      fetchMore({
        variables: {
          offset: dataProvider.getSize(),
        },
        updateQuery: (pqr, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            followingshops: [...pqr.followingshops, ...fetchMoreResult.followingshops],
          };
        },
      });
    }
  };

  const _rowRenderer = (type: any, data: any) => {
    return (
      <ShopsRow
        data={{
          shopId: data.id,
          shopName: data.name,
          shopPicture: data.avatar,
          numProducts: data.numProducts,
          isShopFollowed: data.isShopFollowed,
        }}
        actions={{
          toggleFollowShop: (shopId: number, status: any) =>
            toggleFollowShop({ variables: { shopId, status } }),
          onItemPressed: (shopId: number, shopName: string) =>
            nav.pushWithTitle(componentId, 'ShopScreen', shopName, {
              shopId,
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
      {dataProviderWithData.current.getSize() ? (
        <RecyclerListView
          style={{ flex: 1 }}
          onEndReached={_handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={_rowRenderer}
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
        <EmptyScreen title={'you dont follow any shops'} />
      )}
    </View>
  );
};

FollowingShopScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
