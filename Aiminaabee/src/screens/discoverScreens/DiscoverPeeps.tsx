import React, { useState, useRef } from 'react';
import { RefreshControl } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { View, Button, Text } from 'react-native-ui-lib';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

//query
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { SEARCH_USERS } from '../../requests/search';

//services
import { useServices } from '../../services';

//components
import { SearchBox } from '../../components/comon/SearchBox';
import { UserRow } from '../../components/appRows/user/UserRow';

//custom hooks
import { useToggleFollowUser } from '../../requests/mutations/user';
import { useGetUserContacts } from '../../hooks/useGetUserContacts';

const LIMIT = 30;

export const DiscoverPeeps: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: toggleFollowUser } = useToggleFollowUser();
  // const { getContacts } = useGetUserContacts();

  const [query, setQuery] = useState('');

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(SEARCH_USERS, {
    variables: { limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.searchUsers) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.searchUsers);
  }

  //user layout
  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(3));

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
          onItemPressed: (userId: number, userName: string) =>
            nav.pushWithTitle(componentId, 'OtherUserProfileScreen', userName, {
              userId,
            }),
          toggleFollowUser: (userId: number, status: string) =>
            toggleFollowUser({ variables: { userId, status } }),
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
          placeholder: 'search people',
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
        dataProvider={dataProviderWithData.current}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() => refetch({ offset: 0, limit: LIMIT, searchQuery: '' })}
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

DiscoverPeeps.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
