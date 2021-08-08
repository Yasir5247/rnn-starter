import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-ui-lib';

import { useApolloClient, useQuery } from '@apollo/client';

import { AUTH_USER } from '../../requests/users';

//services
import { useServices } from '../../services';

//components
import { ImageLoader } from '../../components/comon/ImageLoader';

import Icon from 'react-native-vector-icons/Feather';
const messageIcon = <Icon name="message-circle" size={25} color={'#000'} />;

interface ShopDetailProps {
  data: {
    shopId: number;
    shopName: string;
    shopPicture: string;
    numShopProducts: number;
    numShopFollowers: number;
    isShopFollowed: boolean;
    shopConvId: string;
    isMyShop: boolean;
    loadingStatus: boolean;
  };
  actions: {
    onPressShopFollowers: (shopId: number) => void;
    toggleFollowShop: (shopId: number, status: any) => void;
    onChatPressed: () => void;
  };
}

export const ShopDetails: React.FC<ShopDetailProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();

  const shopFollowingStatus = data.isShopFollowed ? 0 : 1;

  const apolloClient = useApolloClient();

  const { authUser } = apolloClient.readQuery<any>({ query: AUTH_USER });
  const { id: authUserId } = authUser;

  return (
    <View style={styles.shopDetails}>
      <View style={{ marginRight: 10 }}>
        <ImageLoader
          style={{ width: 80, height: 80 }}
          imageStyle={{ borderRadius: 100 }}
          source={{ uri: data.shopPicture }}
        />
      </View>
      <View style={styles.numbersBox}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={styles.number}>
            <Text style={styles.numberText}>{data.numShopProducts}</Text>
            <Text style={styles.nameText}> Products </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => actions.onPressShopFollowers(data.shopId)}>
            <View style={styles.number}>
              <Text style={styles.numberText}>{data.numShopFollowers}</Text>
              <Text style={styles.nameText}> Followers </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {!data.isMyShop ? (
          <View style={styles.followButtonBox}>
            <View style={styles.followButton}>
              <Button
                bg-btnBg
                br20
                label={t.do('section.navigation.button.signUp')}
                onPress={() => actions.toggleFollowShop}
              />
            </View>
            <TouchableWithoutFeedback onPress={() => actions.onChatPressed()}>
              <View style={styles.messageBox}>{messageIcon}</View>
            </TouchableWithoutFeedback>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shopDetails: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
  },
  numbersBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  followButtonBox: {
    flex: 1,
    flexDirection: 'row',
  },
  followButton: {
    width: '80%',
  },
  messageBox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginLeft: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
  numberText: {
    color: '#000',
    fontSize: 14,
  },
  nameText: {
    color: '#000',
    fontSize: 14,
  },
});
