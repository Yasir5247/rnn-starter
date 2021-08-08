import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, ActivityIndicator, AppState, useWindowDimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { View, Text } from 'react-native-ui-lib';
import { TabView, SceneMap } from 'react-native-tab-view';

//apollo
import { useSubscription } from '@apollo/client';
import { useQuery, NetworkStatus } from '@apollo/client';

//services
import { useServices } from '../../services';

//Components
import { YouTab } from '../../components/notification/YouTab';
import { FollowingTab } from '../../components/notification/FollowingTab';

//Navigation
import { NavigationFunctionComponent } from 'react-native-navigation';

//queries
import { NOTIFICATION_COUNT_SUBSCRIPTION } from '../../requests/subscriptions/notification';
import { USER_NOTIFICATION_COUNT } from '../../requests/userNotifications';

//custom hooks
import { useToggleFollowUser } from '../../requests/mutations/user';

export const NotificationScreen: NavigationFunctionComponent = ({ componentId }) => {
  //state

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'you', title: 'You' },
    { key: 'following', title: 'Following' },
  ]);

  //services
  const { nav, t } = useServices();

  //layout
  const layout = useWindowDimensions();

  //custom hooks
  const { mutate: toggleFollowUser } = useToggleFollowUser();

  //refs
  const hasNotiCountChangedRef: any = useRef(false);

  // const { data, loading } = useSubscription(NOTIFICATION_COUNT_SUBSCRIPTION);
  const { loading, data, refetch } = useQuery(USER_NOTIFICATION_COUNT);

  //notification Handler
  useEffect(() => {
    const countData = data?.userNotificationCount.count ?? '';
    const count = countData === 0 ? '' : countData;

    Navigation.mergeOptions(componentId, {
      bottomTab: {
        badge: count.toString(),
      },
    });
  }, [componentId, data?.userNotificationCount.count]);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    const screenEventListener = Navigation.events().registerComponentDidDisappearListener(
      ({ componentId }) => {
        if (componentId === 'NOTIFICATION_TAB') {
          if (hasNotiCountChangedRef.current) {
            handleUpdateNotificationCount();
          }
        }
      },
    );
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      screenEventListener.remove();
    };
  }, [componentId]);

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState !== 'active' && nextAppState !== 'inactive') {
      if (hasNotiCountChangedRef.current) {
        handleUpdateNotificationCount();
      }
    }
  };

  const FollowingTab = () => {
    return (
      <FollowingTab
        actions={{
          onProductPress: (prodId: number, productName: string) =>
            nav.pushWithTitle(componentId, 'ProductDetailScreen', productName, {
              prodId,
            }),
        }}
      />
    );
  };

  const YouTab = () => (
    <YouTab
      actions={{
        onPressUser: (userId: number, userName: string) =>
          nav.pushWithTitle(componentId, 'OtherUserProfileScreen', userName, {
            userId,
          }),
        onShopPress: (shopId: number, shopName: string) =>
          nav.pushWithTitle(componentId, 'ShopScreen', shopName, {
            shopId,
          }),
        onPressShopOrderDetail: (orderId: number) =>
          nav.push(componentId, 'OrderDetailScreen', { orderId, screen: '' }),
        onPressInvitedShop: (shopId: number, shopName: string) =>
          nav.pushWithTitle(componentId, 'ShopScreen', shopName, {
            shopId,
          }),
        toggleFollowUser: (userId: number, status: any) =>
          toggleFollowUser({ variables: { userId, status } }),
      }}
    />
  );

  const handleUpdateNotificationCount = () => refetch();

  if (loading) {
    <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View flex-1 bg-bgColor>
        {/* <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            you: YouTab,
            following: FollowingTab,
          })}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        /> */}
      </View>
    </SafeAreaView>
  );
};
