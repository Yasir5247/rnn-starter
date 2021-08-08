import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ActivityIndicator, RefreshControl, Dimensions, Platform } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { View, Button, Text } from 'react-native-ui-lib';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

//query
import { NetworkStatus, useQuery, useApolloClient } from '@apollo/client';

//libraries
import { GiftedChat } from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';

//components
import SlackMessage from '../../components/comment/SlackMessage';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

//hooks
import { useMakeComment } from '../../requests/mutations/comments';

import { AUTH_USER } from '../../requests/users';
import { GET_COMMENTS } from '../../requests/comments';
import { COMMENT_MESSAGE_SUBSCRIPTION } from '../../requests/subscriptions/comments';

const LIMIT = 30;

export const CommentScreen: NavigationFunctionComponent = ({ componentId, productId }: any) => {
  console.log('productId', productId);

  //hooks
  const { mutate: makeComment } = useMakeComment();

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(8));

  const apolloClient = useApolloClient();

  const { authUser }: any = apolloClient.readQuery({ query: AUTH_USER });
  const { loading, data, networkStatus, refetch, fetchMore, subscribeToMore } = useQuery(
    GET_COMMENTS,
    {
      variables: { productId: productId, offset: 0, limit: LIMIT },
      notifyOnNetworkStatusChange: true,
    },
  );

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.getComments) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.getComments);
  }

  useEffect(() => {
    subscribeToMore({
      document: COMMENT_MESSAGE_SUBSCRIPTION,
      variables: { productId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        return {
          getComments: [...prev.getComments, subscriptionData.data.comments],
        };
      },
    });
  }, [componentId]);

  const renderMessage = (props: any) => {
    // prettier-ignore
    const { currentMessage: { text: currText } } = props;
    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />;
  };

  const onSend = async (messages: any) => {
    await makeComment({
      variables: {
        productId: productId,
        body: messages[0].text,
      },
    });
  };

  const _rowRenderer = (type: any, data: any) => {
    return (
      <GiftedChat
        messages={[data]}
        onSend={(messages) => onSend(messages)}
        user={{ _id: authUser.id }}
        renderMessage={renderMessage}
      />
    );
  };

  const onEndReached = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          productId: productId,
          offset: dataProviderWithData.current.getSize(),
        },
      });
    }
  };

  const _renderFooter = () => {
    return loading ? (
      <View center style={{ height: 50 }}>
        <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />
      </View>
    ) : null;
  };

  return (
    <View flex-1 bg-bgColor>
      {dataProviderWithData.current.getSize() ? (
        <RecyclerListView
          style={{ flex: 1 }}
          dataProvider={dataProviderWithData?.current ?? []}
          onEndReached={onEndReached}
          layoutProvider={layoutProvider}
          rowRenderer={_rowRenderer}
          onEndReachedThreshold={10}
          renderFooter={_renderFooter}
          forceNonDeterministicRendering={true}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === NetworkStatus.refetch}
              onRefresh={() => {
                refetch({ offset: 0, limit: LIMIT });
              }}
              colors={['#EA0000']}
              tintColor="#000"
              title="loading..."
              titleColor="#000"
              progressBackgroundColor="white"
            />
          }
        />
      ) : (
        <EmptyScreen title={'no products in this category'} />
      )}
    </View>
  );
};

CommentScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
