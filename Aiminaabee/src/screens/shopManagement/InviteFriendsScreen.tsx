import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

//listView
import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { INVITE_FRIENDS } from '../../requests/shop';
import { FriendsInvite, FriendsInviteVariables } from '../../requests/__generated__/FriendsInvite';

//components
import { FriendsInviteRow } from '../../components/appRows/friends/InviteFriendsRow';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

//custom hooks
import { useInviteFriend } from '../../requests/mutations/shop';

//services
import { useServices } from '../../services';

const LIMIT = 20;

export const InviteFriendsScreen: NavigationFunctionComponent = ({ componentId, shopId }: any) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: inviteShop } = useInviteFriend();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery<
    FriendsInvite,
    FriendsInviteVariables
  >(INVITE_FRIENDS, {
    variables: { shopId: shopId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.friendsInvite) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.friendsInvite);
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(3));

  const handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          shopId: shopId,
          limit: LIMIT,
          offset: dataProviderWithData.current.getSize(),
        },
        updateQuery: (pqr: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            friendsInvite: [...pqr.friendsInvite, ...fetchMoreResult.friendsInvite],
          };
        },
      });
    }
  };

  const rowRenderer = (type: any, data: any) => {
    return (
      <FriendsInviteRow
        key={data.id}
        data={{
          __typename: 'User',
          id: data.id,
          name: data.name,
          avatar: data.avatar,
          wasInvited: data.wasInvited,
        }}
        actions={{
          onItemPressed: (userId: number, userName: string) =>
            nav.pushWithTitle(componentId, 'OtherUserProfileScreen', userName, {
              userId,
            }),
          inviteShop: (userId: number) => inviteShop({ variables: { userId, shopId } }),
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
          onEndReached={handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          renderFooter={_renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === NetworkStatus.refetch}
              onRefresh={() => refetch({ limit: LIMIT, offset: 0 })}
              colors={['#EA0000']}
              tintColor="#000"
              title="loading..."
              titleColor="#000"
              progressBackgroundColor="#fff"
            />
          }
        />
      ) : (
        <EmptyScreen title={'no friends yet'} />
      )}
    </View>
  );
};

InviteFriendsScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
