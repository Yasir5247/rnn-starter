import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { View } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_MY_ORDERS } from '../../requests/orders';
import { UserOrders, UserOrdersVariables } from '../../requests/__generated__/UserOrders';

//services
import { useServices } from '../../services';

//components
import { OrdersRow } from '../../components/appRows/orders/OrdersRow';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

//Components
import { BeeModal } from '../../components/comon/BeeModal';
import { ModalRow } from '../../components/comon/ModalRow';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

const shippingIcon = <Icon2 name="local-shipping" size={20} color="#000" />;
const homeIcon = <Icon2 name="home" size={20} color="#000" />;
const loadingIcon = <Icon name="loading1" size={17} color="#000" />;

const LIMIT = 20;

export const UserOrderScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //refs
  const modelRef = useRef<any>(null);

  //navigation buttons
  useNavigationButtonPress(() => modelRef.current.open(), componentId, 'filter');

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery<
    UserOrders,
    UserOrdersVariables
  >(GET_MY_ORDERS, {
    variables: { limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.userOrders.success) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.userOrders.order || [],
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
          const oldValues = pqr.userOrders.order || [];
          const newValues = fetchMoreResult?.userOrders.order || [];
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            userOrders: [...oldValues, ...newValues],
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
          shop: data.shop.name,
          user: data.user,
          product: data.product,
        }}
        actions={{
          onPressOrderDetail: (orderId) =>
            nav.push(componentId, 'OrderDetailScreen', {
              orderId,
              screen: 'userOrderScreen',
            }),
          makeFeedBack: (productId, productName, productImage) =>
            nav.push(componentId, 'OrderFeedBackScreen', {
              productId,
              productName,
              productImage,
            }),
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
    <View flex bg-bg2Color paddingH-10>
      {dataProviderWithData.current.getSize() ? (
        <RecyclerListView
          style={{ flex: 1 }}
          onEndReached={handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          forceNonDeterministicRendering={true}
          renderFooter={_renderFooter}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === NetworkStatus.refetch}
              onRefresh={() => {
                refetch({ status: 0, limit: LIMIT, offset: 0 });
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
        <EmptyScreen title={'You dont have any orders'} />
      )}
      <BeeModal heading={'Filter Orders'} modalRef={modelRef} modalHeight={300}>
        <ModalRow
          data={{
            icon: shippingIcon,
            title: 'Processing',
          }}
          actions={{
            onMenuPress: () => refetch({ status: 1 }),
          }}
        />
        <ModalRow
          data={{
            icon: homeIcon,
            title: 'Shipped',
          }}
          actions={{
            onMenuPress: () => refetch({ status: 2 }),
          }}
        />
        <ModalRow
          data={{
            icon: loadingIcon,
            title: 'Delivered',
          }}
          actions={{
            onMenuPress: () => refetch({ status: 3 }),
          }}
        />
      </BeeModal>
    </View>
  );
};

UserOrderScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
