import React from 'react';
import { ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { View } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

//requests
import { useQuery } from '@apollo/client';
import { NetworkStatus } from '@apollo/client';
import { GET_ORDER_DETAILS } from '../../requests/orders';
import { OrderDetail, OrderDetailVariables } from '../../requests/__generated__/OrderDetail';

//services
import { useServices } from '../../services';

//custom hooks
import { useChangeOrderStatus } from '../../requests/mutations/order';

//components
import { OrderUserCard } from '../../components/order/OrderUserCard';
import { OrderShopCard } from '../../components/order/OrderShopCard';
import { OrderProductCard } from '../../components/order/OrderProductCard';
import { OrderDetailCard } from '../../components/order/OrderDetailCard';
import { ShippingStatusCard } from '../../components/order/ShippingStatusCard';
import { OrderCancellButton } from '../../components/order/OrderCancellButton';
import { OrderShippingAdressCard } from '../../components/order/OrderShippingAdressCard';
import { OrderMakeShippedButton } from '../../components/order/OrderMakeShippedButton';
import { OrderLogsCard } from '../../components/order/OrderLogsCard';

export const OrderDetailScreen: NavigationFunctionComponent = ({
  componentId,
  orderId,
  screen,
}: any) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: changeOrderStatus } = useChangeOrderStatus();

  //query to get order details
  const { loading, data, networkStatus, refetch } = useQuery<OrderDetail, OrderDetailVariables>(
    GET_ORDER_DETAILS,
    {
      variables: { orderId: orderId },
    },
  );

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  const orderDetails = data!.orderDetail.order;

  const showButtons = () => {
    if (screen === 'userOrderScreen') {
      switch (orderDetails?.status) {
        case 'Processing':
          return (
            <OrderCancellButton
              data={{
                orderId: orderDetails!.id,
                title: 'Cancel Order',
                status: 'Cancelled',
              }}
              actions={{
                changeOrderStatus: (orderId, status) =>
                  changeOrderStatus({ variables: { orderId: orderId, status } }),
              }}
            />
          );
        case 'Shipped':
          return (
            <OrderCancellButton
              data={{
                orderId: orderDetails!.id,
                title: 'Make Delivered',
                status: 'Delivered',
              }}
              actions={{
                changeOrderStatus: (orderId, status) =>
                  changeOrderStatus({ variables: { orderId: orderId, status } }),
              }}
            />
          );
        default:
          return null;
      }
    } else {
      return (
        <OrderCancellButton
          data={{
            orderId: orderDetails!.id,
            title: 'Make Shipped',
            status: 'Shipped',
          }}
          actions={{
            changeOrderStatus: (orderId, status) =>
              changeOrderStatus({ variables: { orderId: orderId, status } }),
          }}
        />
      );
    }
  };

  return (
    <View flex-1 bg-bgColor paddingH-10>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() => refetch({ orderId: orderId })}
            colors={['#EA0000']}
            tintColor="#000"
            title="loading..."
            titleColor="#000"
            progressBackgroundColor="white"
          />
        }>
        <ShippingStatusCard shippingStatus={orderDetails?.status ?? ''} />
        <OrderLogsCard
          data={{
            orderId: orderId,
          }}
          actions={{
            onPressLog: (orderId: number) => nav.push(componentId, 'OrderLogScreen', { orderId }),
          }}
        />
        {screen === 'userOrderScreen' ? (
          //display order placed shop view in users order details
          <OrderShopCard
            data={{
              shopId: orderDetails!.shop.id,
              userId: orderDetails!.shop.id,
              shopName: orderDetails!.shop.name,
              shopImage: orderDetails!.shop.avatar,
              shopContact: orderDetails!.shop.contact,
            }}
          />
        ) : (
          //shop managment orders screen view wich shows the user who ordered
          <OrderUserCard
            data={{
              userId: orderDetails!.shop.id,
              userName: orderDetails!.user!.name,
              userImage: orderDetails!.user!.avatar,
              shopContact: orderDetails!.shop.contact,
            }}
          />
        )}
        <OrderProductCard
          data={{
            products: orderDetails?.product ?? [],
            orderStatus: orderDetails?.status ?? '',
          }}
          actions={{
            makeFeedBack: (productId: number, productName: string, productImage: string) =>
              nav.push(componentId, 'OrderFeedBackScreen', {
                productId,
                productName,
                productImage,
              }),
          }}
        />
        <OrderDetailCard
          data={{
            subTotal: orderDetails!.subTotal,
            totalTaxPrice: orderDetails!.totalTaxPrice,
            totalPrice: orderDetails!.totalPrice,
          }}
        />
        <OrderShippingAdressCard
          data={{
            orderId: orderDetails!.id,
            shippingId: orderDetails!.shippingId,
          }}
          actions={{
            showDeliveryAdressScreen: (orderId: number, shippingId: number) =>
              nav.push(componentId, 'DeliveryAdressScreen', {
                orderId,
                shippingId,
              }),
          }}
        />
        {showButtons()}
      </ScrollView>
    </View>
  );
};

OrderDetailScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
