import React, { useState, useRef } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { View } from "react-native-ui-lib";

import { RecyclerListView } from "recyclerlistview";
import { dataProvider } from "../../utils/dataProvider";
import { LayoutUtil } from "../../utils/LayoutUtil";

import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { USER_FRIENDS } from "../../requests/users";

//components
import { UserRow } from "../../components/appRows/user/UserRow";
import { FriendsEmptyScreen } from "../../components/emptyScreens/FriendsEmptyScreen";

//services
import { useServices } from "../../services";

//navigation
import { NavigationFunctionComponent } from "react-native-navigation";

const LIMIT = 20;

export const FriendsScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(
    USER_FRIENDS,
    {
      variables: { limit: LIMIT, offset: 0 },
      notifyOnNetworkStatusChange: true,
    }
  );

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.userFriends) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.userFriends
    );
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(3));

  const _handleListEnd = () => {
    if (
      networkStatus !== NetworkStatus.fetchMore &&
      dataProviderWithData.current.getSize()
    ) {
      fetchMore({
        variables: {
          offset: dataProviderWithData.current.getSize(),
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
        actions={
          {
            // onItemPressed: (userId: number, userName: string) =>
            //   nav.pushWithTitle(
            //     componentId,
            //     "OtherUserProfileScreen",
            //     userName,
            //     {
            //       userId,
            //     }
            //   ),
          }
        }
      />
    );
  };

  const _renderFooter = () => {
    return loading ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={"black"} />
    ) : (
      <View style={{ height: 80 }} />
    );
  };

  return (
    <View flex-1 bg-bgColor>
      {dataProviderWithData.current.getSize() ? (
        <RecyclerListView
          onEndReached={_handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={_rowRenderer}
          renderFooter={_renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === NetworkStatus.refetch}
              onRefresh={() => refetch({ limit: LIMIT, offset: 0 })}
              colors={["#EA0000"]}
              tintColor="#000"
              title="loading..."
              titleColor="#000"
              progressBackgroundColor="#fff"
            />
          }
        />
      ) : (
        <FriendsEmptyScreen
          onRefresh={() => refetch({ limit: LIMIT, offset: 0 })}
        />
      )}
    </View>
  );
};

FriendsScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
