import React from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

//icon
import { sharedIcon } from '../../utils/icons';

//queries
import { AUTH_USER } from '../../requests/users';
import { useApolloClient } from '@apollo/client';
import { AuthUser } from '../../requests/__generated__/AuthUser';

//custom hooks
import { useGetConversationIds } from '../../hooks/useGetConvId';

interface OrderShopCardProps {
  data: {
    shopId: number;
    userId: number | null;
    shopName: string;
    shopImage: string;
    shopContact: string;
  };
}

export const OrderShopCard: React.FC<OrderShopCardProps> = ({ data }) => {
  //custom hooks
  const { getShopConvId } = useGetConversationIds();
  const apolloClient = useApolloClient();
  const authUser = apolloClient.readQuery<AuthUser>({ query: AUTH_USER });

  // const getConvId = async (): Promise<string> => {
  //   //get shop conversation id
  //   const shopConvId = await getShopConvId({ userId: data.userId, shopId: data.shopId });
  //   const id = shopConvId!;
  //   return id;
  // };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{ width: 40, height: 40, borderRadius: 100 }}
          source={{ uri: data.shopImage }}
        />
      </View>
      <View style={styles.center}>
        <Text style={{ color: '#ccc', fontSize: 14 }}>{data.shopName}</Text>
        <Text style={{ color: '#ccc', fontSize: 12 }}>Contact {data.shopContact}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => null}>
        <View style={styles.right}>{sharedIcon('chat')}</View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#23272A',
    padding: 15,
    marginTop: 10,
  },
  cardContainer: {
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
    marginLeft: 15,
  },
  right: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
  },
});
