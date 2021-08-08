import React, { useRef, useEffect } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { View } from 'react-native-ui-lib';
import { GiftedChat } from 'react-native-gifted-chat';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { dataProvider } from '../../utils/dataProvider';

import { NetworkStatus, useQuery, useApolloClient } from '@apollo/client';

import { AUTH_USER } from '../../requests/users';
import { GET_USER_SHOP_MESSGS } from '../../requests/chat';
import { SEND_SHOP_MESSAGES } from '../../requests/mutations/chat';
import { SHOP_MESSAGE_SUBSCRIPTION } from '../../requests/subscriptions/messages';

const LIMIT = 100;

export const ShopUserScreen: NavigationFunctionComponent = ({
  componentId,
  shopConvId,
  userId,
  shopId,
}: any) => {
  // console.log('userId', userId, 'shopId', shopId);

  const apolloClient = useApolloClient();

  const { authUser } = apolloClient.readQuery({ query: AUTH_USER });

  useEffect(() => {
    subscribeToMore({
      document: SHOP_MESSAGE_SUBSCRIPTION,
      variables: { type: userId === authUser.id ? 'user-shop' : 'shop-user', userId, shopId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        return {
          getUserShopConver: [...prev.getUserShopConver, subscriptionData.data.shopMessage],
        };
      },
    });
  }, [componentId]);

  const { loading, data, networkStatus, refetch, fetchMore, subscribeToMore } = useQuery(
    GET_USER_SHOP_MESSGS,
    {
      variables: { convId: shopConvId, offset: 0, limit: LIMIT },
      notifyOnNetworkStatusChange: true,
    },
  );

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.getUserShopConver) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.getUserShopConver,
    );
  }

  onSend = async (messages) => {
    await apolloClient.mutate({
      mutation: SEND_SHOP_MESSAGES,
      variables: {
        type: userId === authUser.id ? 'user-shop' : 'shop-user',
        userId: userId,
        shopId: shopId,
        body: messages[0].text,
      },
    });
  };

  return (
    <View flex-1 bg-bgColor>
      <GiftedChat
        messages={dataProviderWithData?.current._data ?? []}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userId === authUser.id ? authUser.id : shopId }}
        showUserAvatar={true}
        renderUsernameOnMessage={true}
      />
    </View>
  );
};

ShopUserScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
