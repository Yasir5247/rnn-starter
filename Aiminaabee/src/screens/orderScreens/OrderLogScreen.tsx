import React, { useState, useRef } from 'react';
import { StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { View } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_ORDER_LOGS } from '../../requests/orderLog';

//types
import {
  OrderLogs,
  OrderLogsVariables,
  OrderLogs_orderLogs_log,
} from '../../requests/__generated__/OrderLogs';

//components
import { LogRow } from '../../components/appRows/orderLog/LogRow';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

const LIMIT = 20;

export const OrderLogScreen: NavigationFunctionComponent = ({ componentId, orderId }: any) => {
  //query
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery<
    OrderLogs,
    OrderLogsVariables
  >(GET_ORDER_LOGS, {
    variables: { orderId: orderId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.orderLogs) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.orderLogs.log);
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(14));

  const _handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          offset: dataProviderWithData.current.getSize(),
          limit: LIMIT,
        },
        updateQuery: (pqr: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            orderLogs: [...pqr.orderLogs, ...fetchMoreResult.orderLogs],
          };
        },
      });
    }
  };

  const _rowRenderer = (type: any, data: OrderLogs_orderLogs_log) => {
    return (
      <LogRow
        data={{
          remarks: data.remarks,
          date: data.formattedDate,
        }}
      />
    );
  };

  const _renderFooter = () => {
    return loading ? (
      <View center style={{ height: 50 }}>
        <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      {dataProviderWithData.current.getSize() ? (
        <RecyclerListView
          style={{ flex: 1 }}
          onEndReached={_handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={_rowRenderer}
          forceNonDeterministicRendering={true}
          renderFooter={_renderFooter}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === NetworkStatus.refetch}
              onRefresh={() => {
                refetch({ orderId: orderId, limit: LIMIT, offset: 0 });
              }}
              colors={['#EA0000']}
              tintColor="white"
              title="loading..."
              titleColor="white"
              progressBackgroundColor="white"
            />
          }
        />
      ) : (
        <EmptyScreen title={'no logs'} />
      )}
    </View>
  );
};

OrderLogScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 5,
  },
});
