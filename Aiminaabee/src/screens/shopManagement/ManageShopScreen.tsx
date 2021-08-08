import React from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { useQuery } from '@apollo/client';
import { GET_SINGLE_SHOP } from '../../requests/shop';

//Components
import { ImageLoader } from '../../components/comon/ImageLoader';
import { CardMenu } from '../../components/boxMenu';

//services
import { useServices } from '../../services';

//icons
import { sharedIcon } from '../../utils/icons';

export const ManageShopScreen: NavigationFunctionComponent = ({ componentId, shopId }: any) => {
  //services
  const { nav, t } = useServices();

  const { loading, data: shopData } = useQuery(GET_SINGLE_SHOP, {
    variables: { shopId },
  });

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  const { id, name, avatar, categoryId, numProducts, numFollowers, isVerified } =
    shopData?.getSingleShop ?? {};

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.shopInfoContainer}>
        <View style={styles.shopPictureBox}>
          <ImageLoader
            style={{ borderRadius: 100, width: 80, height: 80, marginBottom: 10 }}
            imageStyle={{ borderRadius: 100 }}
            source={{ uri: avatar }}
          />
          <Text>{name}</Text>
        </View>
        <View style={styles.numberBox}>
          <View style={styles.number}>
            <Text style={{ color: '#000', fontSize: 15 }}>{numProducts}</Text>
            <Text style={{ color: '#000' }}> Products </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => nav.push(componentId, 'ShopFollowerScreen', { shopId })}>
            <View style={styles.number}>
              <Text style={{ color: '#000', fontSize: 15 }}>{numFollowers}</Text>
              <Text style={{ color: '#000' }}> Followers </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <CardMenu
          data={{
            id: id,
            name: name,
            control: 'top',
            title: 'Edit Shop',
            icon: sharedIcon('edit'),
          }}
          actions={{
            onPressMenu: async (id?: number, name?: string) =>
              nav.push(componentId, 'ShopEditScreen', {
                shopId: id,
                shopName: name,
              }),
          }}
        />
        <CardMenu
          data={{
            id: id,
            name: name,
            control: 'middle',
            title: 'Edit Shop Picture',
            icon: sharedIcon('picture'),
          }}
          actions={{
            onPressMenu: async (id?: number, name?: string) =>
              nav.push(componentId, 'ShopPicUpdateScreen', {
                shopId: id,
                shopName: name,
                avatar,
              }),
          }}
        />
        <CardMenu
          data={{
            id: id,
            name: name,
            control: 'middle',
            title: 'Edit Shop Location',
            icon: sharedIcon('location'),
          }}
          actions={{
            onPressMenu: (id?: number, name?: string) =>
              nav.push(componentId, 'ShopUpdateLocScreen', {
                shopId: id,
                shopName: name,
                avatar,
              }),
          }}
        />
        <CardMenu
          data={{
            id: id,
            name: name,
            control: 'middle',
            title: 'Shop Inventory',
            icon: sharedIcon('database'),
          }}
          actions={{
            onPressMenu: (id?: number, name?: string) =>
              nav.push(componentId, 'ShopInventory', {
                shopId: id,
              }),
          }}
        />
        <CardMenu
          data={{
            id: id,
            name: name,
            control: 'middle',
            title: 'Shop Reviews',
            icon: sharedIcon('eye'),
          }}
          actions={{
            onPressMenu: (id?: number, name?: string) =>
              nav.push(componentId, 'ShopReviewScreen', {
                shopId: id,
                screen: 'shopManagement',
              }),
          }}
        />
        <CardMenu
          data={{
            id: id,
            name: name,
            control: 'bottom',
            title: 'Shop Orders',
            icon: sharedIcon('file'),
          }}
          actions={{
            onPressMenu: (id?: number, name?: string) =>
              nav.push(componentId, 'ShopOrderScreen', {
                shopId: id,
              }),
          }}
        />
      </View>
      <View style={styles.otherMenuContainer}>
        <View style={styles.singleMenu}>
          <Button
            bg-btnBg
            h1
            br20
            label={t.do('section.appWideButtons.button.addProducts')}
            onPress={() =>
              nav.push(componentId, 'ImageSelectionScreen', {
                shopId: id,
                shopName: name,
                categoryId,
              })
            }
          />
        </View>
        <View style={styles.singleMenu}>
          <Button
            bg-btnBg
            h1
            br20
            label={t.do('section.appWideButtons.button.inviteFriends')}
            onPress={(id: number) =>
              nav.push(componentId, 'InviteFriendsScreen', {
                shopId: id,
              })
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

ManageShopScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    // borderWidth: 1, borderColor: 'green',
  },
  shopInfoContainer: {
    paddingVertical: 10,
    // borderWidth: 1, borderColor: 'green',
  },
  cardContainer: {
    paddingVertical: 10,
    // borderWidth: 1, borderColor: 'green',
  },
  otherMenuContainer: {
    marginBottom: 100,
    // borderWidth: 1, borderColor: '#000',
  },
  singleMenu: {
    height: 45,
    paddingVertical: 2,
  },
  shopPictureBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 8,
  },
  numberBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  number: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
