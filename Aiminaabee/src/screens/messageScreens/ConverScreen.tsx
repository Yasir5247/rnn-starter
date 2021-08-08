import React, { useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';

//query
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_CONVERSATIONS } from '../../requests/chat';

//services
import { useServices } from '../../services';

//components
import UserRow from '../../components/message/UserRow';
import UserShopRow from '../../components/message/UserShopRow';
import ShopUserRow from '../../components/message/ShopUserRow';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

let { width } = Dimensions.get('window');
const LIMIT = 20;

export const converScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(GET_CONVERSATIONS, {
    variables: { limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.getConversations) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.getConversations,
    );
  }

  const [layoutProvider] = useState(
    () =>
      new LayoutProvider(
        (i) => {
          return dataProviderWithData.current.getDataForIndex(i).__typename;
        },
        (type, dim) => {
          switch (type) {
            case 'ConverUserUser':
              dim.width = width;
              dim.height = 90;
              break;
            case 'ConverUserShop':
              dim.width = width;
              dim.height = 90;
              break;
            case 'ConverShopUser':
              dim.width = width;
              dim.height = 90;
              break;
            default:
              dim.width = width;
              dim.height = 0;
          }
        },
      ),
  );

  const _handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProvider.getSize()) {
      fetchMore({
        variables: {
          offset: dataProvider.getSize(),
        },
      });
    }
  };

  const _rowRenderer = (type: any, data: any) => {
    switch (type) {
      case 'ConverUserUser':
        return (
          <UserRow
            key={data._id}
            data={data}
            actions={{
              onItemPressed: (userConvId: string, toId: number, toName: string) => {
                nav.pushWithTitle(componentId, 'MsgUserUserScreen', toName, {
                  userConvId,
                  toId,
                  toName,
                });
              },
            }}
          />
        );
      case 'ConverUserShop':
        return (
          <UserShopRow
            key={data._id}
            data={data}
            onItemPressed={(shopConvId, userId, shopId, image, name, screen) => {
              nav.pushWithTitle(componentId, 'MsgUserShopScreen', name, {
                shopConvId,
                userId,
                shopId,
                image,
                name,
                screen,
              });
            }}
          />
        );
      case 'ConverShopUser':
        return (
          <ShopUserRow
            key={data._id}
            data={data}
            onItemPressed={(userId, shopId, userName) => {
              nav.pushWithTitle(componentId, 'MsgShopUserScreen', userName, {
                shopConvId,
                userId,
                shopId,
                userName,
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  const _renderFooter = () => {
    return loading ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
    ) : (
      <View style={{ height: 80 }} />
    );
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
          renderFooter={_renderFooter}
          forceNonDeterministicRendering={true}
          showsVerticalScrollIndicator={false}
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
        <EmptyScreen title="you have no messages" />
      )}
    </View>
  );
};

converScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: '#CCC',
  },
});
