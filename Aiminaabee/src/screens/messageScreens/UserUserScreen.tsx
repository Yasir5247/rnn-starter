import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import { Actions, GiftedChat } from 'react-native-gifted-chat';

import { dataProvider } from '../../utils/dataProvider';

import { NetworkStatus, useQuery, useApolloClient } from '@apollo/client';

import { AUTH_USER } from '../../requests/users';
import { GET_USER_USER_MESSGS } from '../../requests/chat';
import { USER_MESSAGE_SUBSCRIPTION } from '../../requests/subscriptions/messages';

//custom hooks
import { useSendMessgeToUser } from '../../requests/mutations/chat';

import Icon from 'react-native-vector-icons/Ionicons';
const imageIcon = <Icon name="image-outline" size={20} color="#000" />;

const LIMIT = 100;

export const UserUserScreen: NavigationFunctionComponent = ({
  componentId,
  userConvId,
  toUserId,
}: any) => {
  console.log('toUserId', toUserId, 'converId', userConvId);

  const apolloClient = useApolloClient();

  //custom hooks
  const { mutate: sendUserMessage } = useSendMessgeToUser();

  useEffect(() => {
    subscribeToMore({
      document: USER_MESSAGE_SUBSCRIPTION,
      variables: { userId: toUserId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        return {
          getUserUserConver: [...prev.getUserUserConver, subscriptionData.data.userMessage],
        };
      },
    });
  }, [componentId]);

  const { authUser } = apolloClient.readQuery({ query: AUTH_USER });

  const { loading, data, networkStatus, refetch, fetchMore, subscribeToMore } = useQuery(
    GET_USER_USER_MESSGS,
    {
      variables: { convId: userConvId, limit: LIMIT, offset: 0 },
      notifyOnNetworkStatusChange: true,
    },
  );

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.getUserUserConver) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.getUserUserConver,
    );
  }

  const onSend = async (messages) => {
    await sendUserMessage({
      variables: {
        userId: toUserId,
        body: messages[0].text,
      },
    });
  };

  const handlePickImage = async () => {
    const selected = await ImagePicker.openPicker({ width: 400, height: 400, cropping: true });
    const image_name = selected.filename;
    const image_type = selected.mime;
    const path = `file://${selected.path}`;

    return path;
  };

  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        options={{ ['Send Image']: handlePickImage }}
        icon={() => imageIcon}
        onSend={(args) => console.log('hahaha', args)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={dataProviderWithData?.current._data ?? []}
        onSend={(messages) => onSend(messages)}
        user={{ _id: authUser.id }}
        showUserAvatar={true}
        onPressAvatar={(user) =>
          navMethods.pushWithTitle(componentId, 'OtherUserProfileScreen', user.name, {
            userId: user._id,
          })
        }
        // renderActions={renderActions}
        renderUsernameOnMessage={true}
      />
    </View>
  );
};

UserUserScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
