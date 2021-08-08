import React, { useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

//query
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { USER_SHOPS } from '../../requests/users';
import {
  UserShops,
  UserShopsVariables,
  UserShops_userShops,
} from '../../requests/__generated__/UserShops';

//services
import { useServices } from '../../services';

//components
import { EmptyScreen } from '../../components/comon/EmptyScreen';
import { ShopsRow } from '../../components/appRows/shop/ShopsRow';

//custom hooks
import { useToggleFollowShop } from '../../requests/mutations/shop';

const LIMIT = 20;

export const UserOwnedShops: NavigationFunctionComponent = ({ componentId, userId }: any) => {
  //services
  const { nav, t } = useServices();

  //cutom hooks
  const { mutate: toggleFollowShop } = useToggleFollowShop();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery<
    UserShops,
    UserShopsVariables
  >(USER_SHOPS, {
    variables: { userId: userId, offset: 0, limit: LIMIT },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.userShops) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.userShops);
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
          const oldValues = pqr.userShops ?? [];
          const newValues = fetchMoreResult?.userShops ?? [];
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            userShops: [...oldValues, ...newValues],
          };
        },
      });
    }
  };

  const rowRenderer = (type: any, data: UserShops_userShops) => {
    return (
      <ShopsRow
        key={data.id}
        data={{
          shopId: data.id,
          shopName: data.name,
          shopPicture: data.avatar,
          numProducts: data.numProducts,
          isShopFollowed: data.isShopFollowed,
        }}
        actions={{
          toggleFollowShop: (shopId: number, status: boolean) =>
            toggleFollowShop({ variables: { shopId, status } }),
          onItemPressed: (shopId: number, shopName: string) =>
            nav.pushWithTitle(componentId, 'ShopScreen', shopName, {
              shopId,
            }),
        }}
      />
    );
  };

  const renderFooter = () => {
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
          onEndReached={handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          renderFooter={renderFooter}
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
        <EmptyScreen title={'user doesnt have any shops'} />
      )}
    </View>
  );
};

UserOwnedShops.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
