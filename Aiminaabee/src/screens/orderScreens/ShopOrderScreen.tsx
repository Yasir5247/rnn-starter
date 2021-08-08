import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

//services
import { useServices } from '../../services';

//queries
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_SHOP_ORDERS } from '../../requests/orders';
import { ShopOrders, ShopOrdersVariables } from '../../requests/__generated__/ShopOrders';

//components
import { OrdersRow } from '../../components/appRows/orders/OrdersRow';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

const LIMIT = 20;

export const ShopOrderScreen: NavigationFunctionComponent = ({ componentId, shopId }: any) => {
  //services
  const { nav, t } = useServices();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery<
    ShopOrders,
    ShopOrdersVariables
  >(GET_SHOP_ORDERS, {
    variables: { shopId: shopId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.shopOrders.success) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.shopOrders.order || [],
    );
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(14));

  const handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          offset: dataProviderWithData.current.getSize(),
        },
        updateQuery: (pqr: any, { fetchMoreResult }) => {
          const oldValues = pqr.shopOrders.order || [];
          const newValues = fetchMoreResult?.shopOrders.order || [];
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            shopOrders: [...oldValues, ...newValues],
          };
        },
      });
    }
  };

  const rowRenderer = (type: any, data: any) => {
    return (
      <OrdersRow
        data={{
          __typename: 'ProductOrder',
          id: data.id,
          status: data.status,
          shop: data.shop,
          user: data.user,
          product: data.product,
        }}
        actions={{
          makeFeedBack: (productId: number, productName: string, productImage: string) => null,
          onPressOrderDetail: (orderId: number) =>
            nav.push(componentId, 'OrderDetailScreen', {
              orderId,
              screen: 'shopOrderScreen',
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
    <View flex bg-bg2Color paddingH-10>
      {dataProviderWithData.current.getSize() ? (
        <RecyclerListView
          style={{ flex: 1 }}
          onEndReached={handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          renderFooter={renderFooter}
          forceNonDeterministicRendering={true}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === NetworkStatus.refetch}
              onRefresh={() => refetch({ limit: LIMIT, offset: 0 })}
              colors={['#EA0000']}
              tintColor="white"
              title="loading..."
              titleColor="white"
              progressBackgroundColor="white"
            />
          }
        />
      ) : (
        <EmptyScreen title={'You dont have any orders'} />
      )}
    </View>
  );
};

ShopOrderScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
