import React from 'react';
import _ from 'lodash';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import { ImageLoader } from '../comon/ImageLoader';

//types
import { UserNotifications_userNotifications_ShopInvite } from '../../requests/__generated__/UserNotifications';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const dotIcon = <Icon name="dots-horizontal" size={30} color="#999" />;

interface ShopInviteRowProps {
  data: UserNotifications_userNotifications_ShopInvite;
  actions: {
    onPressInvitedShop: (shopId: number, shopName: string) => void;
  };
}

export const ShopInviteRow: React.FC<ShopInviteRowProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.pictureBox}>
        <View>
          <ImageLoader
            imageStyle={{ borderRadius: 100 }}
            style={styles.imageStyle}
            source={{ uri: data.from.avatar }}
          />
        </View>
      </View>
      <View style={styles.messageBox}>
        <Text style={{ lineHeight: 20 }}>
          <Text light>Your friend </Text>
          <Text bold>{data.from.name} </Text>
          <Text light>from </Text>
          <Text bold>{data.to.name} </Text>
          <Text light>want to follow their shop</Text>
        </Text>
      </View>
      <View style={styles.imageBox}>
        <TouchableWithoutFeedback
          onPress={() => actions.onPressInvitedShop(data.from.id, data.from.name)}>
          <ImageLoader
            imageStyle={{ borderRadius: 0 }}
            style={styles.imageStyle}
            source={{ uri: data.from.name }}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  pictureBox: {
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '15%',
    // borderWidth: 1, borderColor: '#000'
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  messageBox: {
    paddingLeft: 10,
    paddingRight: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '70%',
  },
  imageBox: {
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '15%',
  },
});
