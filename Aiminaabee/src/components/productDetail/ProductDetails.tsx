import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

//custom types
import { converPropTypes } from './types';

//query
import { useApolloClient } from '@apollo/client';
import { AUTH_USER } from '../../requests/users';

//components
import { ConversationRow } from './ConversationRow';

interface ProductDetailProps {
  data: {
    productId: number;
    defaultImage: string;
    shopId: number;
    shopName: string;
    shopContact: string;
    isOwner: boolean;
  };
  actions: {
    onChatPressed: (args: converPropTypes) => void;
  };
}

export const ProductDetails: React.FC<ProductDetailProps> = ({ data, actions }) => {
  //apollo
  const apolloClient = useApolloClient();

  //query
  const { authUser }: any = apolloClient.readQuery({ query: AUTH_USER });

  return (
    <View style={styles.container}>
      <ConversationRow
        data={{
          heading: 'Chat',
          userId: authUser.id,
          shopId: data.shopId,
          shopName: data.shopName,
          image: data.defaultImage,
        }}
        actions={{
          showChat: data.isOwner ? () => null : actions.onChatPressed,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
