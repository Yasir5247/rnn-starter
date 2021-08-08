import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl, Text } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { View } from 'react-native-ui-lib';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_SHOP_FOLLOWERS } from '../../requests/shop';

//services
import { useServices } from '../../services';

//components
import { UserRow } from '../../components/appRows/user/UserRow';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

//custom hooks
import { useToggleFollowUser } from '../../requests/mutations/user';

const LIMIT = 20;

export const ShopFollowerScreen: NavigationFunctionComponent = ({ componentId, shopId }: any) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: toggleFollowUser } = useToggleFollowUser();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(GET_SHOP_FOLLOWERS, {
    variables: { shopId: shopId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.getShopFollowers) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.getShopFollowers,
    );
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(3));

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
            getShopFollowers: [...pqr.getShopFollowers, ...fetchMoreResult.getShopFollowers],
          };
        },
      });
    }
  };

  const rowRenderer = (type: any, data: any) => {
    return (
      <UserRow
        key={data.id}
        data={data}
        actions={{
          onItemPressed: (userId: number, userName: string) =>
            nav.pushWithTitle(componentId, 'OtherUserProfileScreen', userName, {
              userId,
            }),
          toggleFollowUser: (userId: number, status: any) =>
            toggleFollowUser({ variables: { userId, status } }),
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
        <EmptyScreen title="no followers" />
      )}
    </View>
  );
};

ShopFollowerScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
