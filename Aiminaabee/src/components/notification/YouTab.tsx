import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { View } from 'react-native-ui-lib';

import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';

//types
import {
  UserNotifications,
  UserNotificationsVariables,
} from '../../requests/__generated__/UserNotifications';

//components
import { FollowNotiRow } from './FollowNotiRow';
import { NewOrderRow } from './NewOrderRow';
import { ShippedRow } from './ShippedRow';
import { DeliveredRow } from './DeliveredRow';
import { OrderCancelledRow } from './OrderCancelledRow';
import { ShopInviteRow } from './ShopInviteRow';
import { UserNotiEmptyScreen } from './UserNotiEmptyScreen';

//query
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { USER_NOTIFICATIONS } from '../../requests/userNotifications';

let { width } = Dimensions.get('window');
const LIMIT = 20;

interface YouTabProps {
  actions: {
    onPressUser: (userId: number, userName: string) => void;
    onShopPress: (shopId: number, shopName: string) => void;
    onPressShopOrderDetail: (orderId: number) => void;
    onPressInvitedShop: (shopId: number, shopName: string) => void;
    toggleFollowUser: (userId: number, status: any) => void;
  };
}

export const YouTab: React.FC<YouTabProps> = ({ actions }) => {
  //references
  const listViewRef = useRef();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery<
    UserNotifications,
    UserNotificationsVariables
  >(USER_NOTIFICATIONS, {
    variables: { offset: 0, limit: LIMIT },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.userNotifications) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.userNotifications,
    );
  }

  const [layoutProvider] = useState(
    () =>
      new LayoutProvider(
        (i) => {
          return dataProviderWithData.current.getDataForIndex(i).__typename;
        },
        (type, dim) => {
          switch (type) {
            case 'Follow':
              dim.width = width;
              dim.height = 70;
              break;
            case 'NewOrder':
              dim.width = width;
              dim.height = 70;
              break;
            case 'OrderShipped':
              dim.width = width;
              dim.height = 80;
              break;
            case 'OrderDelivered':
              dim.width = width;
              dim.height = 70;
              break;
            case 'OrderCancelled':
              dim.width = width;
              dim.height = 80;
              break;
            case 'ShopInvite':
              dim.width = width;
              dim.height = 80;
              break;
            default:
              dim.width = width;
              dim.height = 0;
          }
        },
      ),
  );

  const handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          offset: dataProviderWithData.current.getSize(),
        },
      });
    }
  };

  const rowRenderer = (type: any, data: any) => {
    switch (type) {
      case 'Follow':
        return <FollowNotiRow data={data} actions={{ ...actions }} />;
      case 'NewOrder':
        return <NewOrderRow data={data} actions={{ ...actions }} />;
      case 'OrderShipped':
        return <ShippedRow data={data} actions={{ ...actions }} />;
      case 'OrderDelivered':
        return <DeliveredRow data={data} actions={{ ...actions }} />;
      case 'OrderCancelled':
        return <OrderCancelledRow data={data} actions={{ ...actions }} />;
      case 'ShopInvite':
        return <ShopInviteRow data={data} actions={{ ...actions }} />;
      default:
        return null;
    }
  };

  const _renderFooter = () => {
    return loading ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
    ) : (
      <View style={{ height: 80 }} />
    );
  };

  return (
    <View flex-1>
      {dataProviderWithData.current.getSize() ? (
        <RecyclerListView
          style={{ flex: 1 }}
          reference={listViewRef}
          onEndReached={handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          renderFooter={_renderFooter}
          forceNonDeterministicRendering={true}
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
      ) : (
        <UserNotiEmptyScreen
          actions={{
            onRefresh: () => refetch({ offset: 0, limit: LIMIT }),
          }}
        />
      )}
    </View>
  );
};
