import React from 'react';
import _ from 'lodash';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import { ImageLoader } from '../comon/ImageLoader';

//types
import { FriendsNots_friendsNots } from '../../requests/__generated__/FriendsNots';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const dotIcon = <Icon name="dots-vertical" size={30} color="#999" />;

const IMAGE_SIZE = 30;

interface UserLikedRowProps {
  data: FriendsNots_friendsNots;
  actions: {
    onProductPress: (prodId: number, productName: string) => void;
  };
}

export const UserLikedRow: React.FC<UserLikedRowProps> = ({ data, actions }) => {
  const likedUsers = data.likedUsers ?? [];

  const _renderLikedUsersImages = () => {
    if (likedUsers?.length == 1) {
      return (
        <ImageLoader
          imageStyle={{ borderRadius: 100 }}
          style={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            borderRadius: 100,
          }}
          source={{ uri: likedUsers[0]?.avatar }}
        />
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
          <ImageLoader
            imageStyle={{ borderRadius: 100 }}
            style={{ width: 30, height: 30 }}
            source={{ uri: likedUsers[0]?.avatar }}
          />
          <ImageLoader
            imageStyle={{ borderRadius: 100, borderWidth: 2, borderColor: '#fff' }}
            style={{ width: 30, height: 30, position: 'absolute', top: 15, left: 8 }}
            source={{ uri: likedUsers[1]?.avatar }}
          />
        </View>
      );
    }
  };

  const _renderMessage = () => {
    if (likedUsers.length == 1) {
      return (
        <Text>
          <Text bold>{likedUsers[0]?.name.toLowerCase()}</Text>
          <Text light> liked this product from </Text>
          <Text bold>{data.shop.name.toLowerCase()}</Text>
        </Text>
      );
    } else if (likedUsers.length == 2) {
      return (
        <Text>
          <Text bold>{likedUsers[0]?.name.toLowerCase()},</Text>
          <Text bold> {likedUsers[1]?.name.toLowerCase()}</Text>
          <Text light> liked this product from </Text>
          <Text bold> {data.shop.name.toLowerCase()} </Text>
        </Text>
      );
    } else {
      return (
        <Text>
          <Text>
            <Text bold>{likedUsers[0]?.name.toLowerCase()},</Text>
            <Text light> {likedUsers[1]?.name.toLowerCase()}</Text>
          </Text>
          <Text bold> and </Text>
          <Text light>others liked this product from</Text>
          <Text bold> {data.shop.name} </Text>
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pictureBox}>{_renderLikedUsersImages()}</View>
      <View style={styles.messageBox}>{_renderMessage()}</View>
      <View style={styles.imageBox}>
        <TouchableWithoutFeedback onPress={() => actions.onProductPress(data.id, data.name)}>
          <ImageLoader
            style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
            source={{ uri: data.avatar }}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
  },
  pictureBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
  },
  messageBox: {
    paddingLeft: 10,
    paddingRight: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '70%',
  },
  imageBox: {
    width: '15%',
  },
});
