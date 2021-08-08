import React, { useState, useRef } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { View } from "react-native-ui-lib";

import { RecyclerListView } from "recyclerlistview";
import { dataProvider } from "../../utils/dataProvider";
import { LayoutUtil } from "../../utils/LayoutUtil";

import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { AUTH_USER_SAVES } from "../../requests/users";

//components
import ProductGrid from "../../components/productView/GridComponent/ProductGrid";

//services
import { useServices } from "../../services";

//navigation
import { NavigationFunctionComponent } from "react-native-navigation";

const LIMIT = 20;

export const UserSavedScreen: NavigationFunctionComponent = ({
  componentId,
  userId,
}: any) => {
  //services
  const { nav, t } = useServices();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(
    AUTH_USER_SAVES,
    {
      variables: { userId: userId, limit: LIMIT, offset: 0 },
      notifyOnNetworkStatusChange: true,
    }
  );

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.authUserSaves) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.authUserSaves
    );
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(1));

  const _handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProvider.getSize()) {
      fetchMore({
        variables: {
          offset: dataProviderWithData.current.getSize(),
        },
        updateQuery: (pqr, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            authUserSaves: [
              ...pqr.authUserSaves,
              ...fetchMoreResult.authUserSaves,
            ],
          };
        },
      });
    }
  };

  const _rowRenderer = (type: any, data: any) => {
    return (
      <ProductGrid
        data={{
          productId: data.id,
          productName: data.name,
          productImage: data.defaultImage,
        }}
        actions={
          {
            // showProduct: (prodId: number, productName: string) =>
            //   nav.pushWithTitle(
            //     componentId,
            //     "ProductDetailScreen",
            //     productName,
            //     {
            //       prodId,
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
          style={{ flex: 1 }}
          onEndReached={_handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={_rowRenderer}
          renderFooter={_renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === NetworkStatus.refetch}
              onRefresh={() =>
                refetch({ userId: userId, limit: LIMIT, offset: 0 })
              }
              colors={["#EA0000"]}
              tintColor="#000"
              title="loading..."
              titleColor="#000"
              progressBackgroundColor="#fff"
            />
          }
        />
      ) : (
        <View />
      )}
    </View>
  );
};

UserSavedScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
