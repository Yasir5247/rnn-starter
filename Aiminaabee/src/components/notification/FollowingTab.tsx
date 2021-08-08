import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { GET_FRIENDS_LIKED_FEED } from '../../requests/friendsLikedNoti';

import { UserLikedRow } from './UserLikedRow';
import { FollowersNotiEmptyScreen } from './FollowersNotiEmpty';

const LIMIT = 20;

interface FollowingTabProps {
  actions: {
    onProductPress: (prodId: number, productName: string) => void;
  };
}

export const FollowingTab: React.FC<FollowingTabProps> = ({ actions }) => {
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(GET_FRIENDS_LIKED_FEED, {
    variables: { offset: 0, limit: LIMIT },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.friendsNots) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.friendsNots);
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(4));

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
    return <UserLikedRow data={data} actions={{ ...actions }} />;
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
          onEndReached={handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
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
      ) : (
        <FollowersNotiEmptyScreen
          actions={{
            onRefresh: () => refetch({ offset: 0, limit: LIMIT }),
          }}
        />
      )}
    </View>
  );
};
