import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { View } from 'react-native-ui-lib';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { USER_LIKES } from '../../requests/users';

//components
import { ProductGrid } from '../../components/productView/GridComponent/ProductGrid';

//services
import { useServices } from '../../services';

//navigation
import { NavigationFunctionComponent } from 'react-native-navigation';

const LIMIT = 20;

export const UserLikedScreen: NavigationFunctionComponent = ({ componentId, userId }: any) => {
  //services
  const { nav, t } = useServices();

  console.log('userId', userId);

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(USER_LIKES, {
    variables: { userId: userId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.userLikes) {
    console.log('data----', data.userLikes);
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.userLikes);
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(1));

  const _handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          offset: dataProviderWithData.current.getSize(),
        },
        updateQuery: (pqr, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            userLikes: [...pqr.userLikes, ...fetchMoreResult.userLikes],
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
      <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
    ) : (
      <View style={{ height: 80 }} />
    );
  };

  console.log('data', data);

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
              onRefresh={() => refetch({ userId, limit: LIMIT, offset: 0 })}
              colors={['#EA0000']}
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

UserLikedScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
