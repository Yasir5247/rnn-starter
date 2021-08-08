import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { View } from 'react-native-ui-lib';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { FOLLOWERS } from '../../requests/users';

import { UserRow } from '../../components/appRows/user/UserRow';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

//services
import { useServices } from '../../services';

//navigation
import { NavigationFunctionComponent } from 'react-native-navigation';

//custom hooks
import { useToggleFollowUser } from '../../requests/mutations/user';

const LIMIT = 20;

export const FollowersScreen: NavigationFunctionComponent = ({ componentId, userId }: any) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: toggleFollowUser } = useToggleFollowUser();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(FOLLOWERS, {
    variables: { userId: userId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.followers) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.followers);
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
            followers: [...pqr.followers, ...fetchMoreResult.followers],
          };
        },
      });
    }
  };

  const _rowRenderer = (type: any, data: any) => {
    return (
      <UserRow
        key={data.id}
        data={{
          userId: data.id,
          userName: data.formatedUserName,
          userAvatar: data.avatar,
          isFollowing: data.isFollowing,
          followersCount: data.followersCount,
        }}
        actions={{
          toggleFollowUser: (userId: number, status: any) =>
            toggleFollowUser({ variables: { userId, status } }),
          // onItemPressed: (userId: number, userName: any) =>
          //   nav.pushWithTitle(componentId, "OtherUserProfileScreen", userName, {
          //     userId,
          //   }),
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
        <EmptyScreen title={'no followers'} />
      )}
    </View>
  );
};

FollowersScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
