import React from 'react';
import { TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import Feather from 'react-native-vector-icons/Feather';

//custom types
import { converPropTypes } from './types';

import { useQuery } from '@apollo/client';
import { GET_SHOP_CONVER_ID } from '../../requests/chat';

interface ConversationRowProps {
  data: {
    heading: string;
    userId: number;
    shopId: number;
    shopName: string;
    image: string;
  };
  actions: {
    showChat: (args: converPropTypes) => void;
  };
}

export const ConversationRow: React.FC<ConversationRowProps> = ({ data, actions }) => {
  //get user converId
  const { loading, data: convData } = useQuery(GET_SHOP_CONVER_ID, {
    variables: { userId: data.userId, shopId: data.shopId },
  });

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  const shopConvId = convData?.shopConvId?.converId ?? null;

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        actions.showChat({
          shopConvId,
          userId: data.userId,
          shopId: data.shopId,
          image: data.image,
          name: data.shopName,
        })
      }>
      <View row bg-bgColor padding-15 style={{ borderBottomWidth: 2, borderColor: '#f2f2f2' }}>
        <View flex-1>
          <Text h1>{data.heading}</Text>
        </View>
        <View flex-1 right marginL-15>
          <Feather name="message-circle" size={20} color={'#000'} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
