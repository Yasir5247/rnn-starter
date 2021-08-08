import React, { useState, useRef } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { View } from "react-native-ui-lib";

import { RecyclerListView } from "recyclerlistview";
import { dataProvider } from "../../utils/dataProvider";
import { LayoutUtil } from "../../utils/LayoutUtil";

import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client";

// import ShopScroller from "../AuthUserScreen/Components/ShopScroller";

import { USER_SHOPS } from "../../requests/users";

//services
import { useServices } from "../../services";

//navigation
import { NavigationFunctionComponent } from "react-native-navigation";

const LIMIT = 20;

const profileAllShops: NavigationFunctionComponent = ({
  componentId,
  userId,
}: any) => {
  //services
  const { nav, t } = useServices();

  //main query
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(
    USER_SHOPS,
    {
      variables: { userId: userId, offset: 0, limit: 20 },
    }
  );

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.userShops) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.userShops
    );
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(6));

  const _handleListEnd = () => {
    if (
      networkStatus !== NetworkStatus.fetchMore &&
      dataProviderWithData.current.getSize()
    ) {
      fetchMore({
        variables: {
          userId: userId,
          offset: dataProviderWithData.current.getSize(),
          limit: LIMIT,
        },
        updateQuery: (pqr, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            userShops: [...pqr.userShops, ...fetchMoreResult.userShops],
          };
        },
      });
    }
  };

  const _rowRenderer = (type: any, data: any) => {
    return <View>{/* <Text>hellow</Text> */}</View>;
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
      <RecyclerListView
        style={{ flex: 1 }}
        onEndReached={_handleListEnd}
        dataProvider={dataProviderWithData.current}
        layoutProvider={layoutProvider}
        rowRenderer={_rowRenderer}
        renderFooter={_renderFooter}
        optimizeForInsertDeleteAnimations={true}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() => refetch({ offset: 0, limit: LIMIT })}
            colors={["#EA0000"]}
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

profileAllShops.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

export default profileAllShops;
