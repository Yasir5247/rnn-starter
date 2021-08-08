import React from 'react';
import _ from 'lodash';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import { ImageLoader } from '../comon/ImageLoader';

//types
import { UserNotifications_userNotifications_OrderDelivered } from '../../requests/__generated__/UserNotifications';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const dotIcon = <Icon name="dots-horizontal" size={30} color="#999" />;

interface DeliveredRowProps {
  data: UserNotifications_userNotifications_OrderDelivered;
  actions: {
    onShopPress: (shopId: number, shopName: string) => void;
    onPressUser: (userId: number, userName: string) => void;
    onPressShopOrderDetail: (orderId: number) => void;
  };
}

export const DeliveredRow: React.FC<DeliveredRowProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.pictureBox}>
        <TouchableWithoutFeedback onPress={() => actions.onShopPress(data.to.id, data.to.name)}>
          <ImageLoader
            imageStyle={{ borderRadius: 100 }}
            style={styles.imageStyle}
            source={{ uri: data.from.avatar }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.messageBox}>
        <Text style={{ lineHeight: 20 }}>
          <TouchableWithoutFeedback
            onPress={() => actions.onPressUser(data.from.id, data.from.name)}>
            <Text bold>{data.from.name}</Text>
          </TouchableWithoutFeedback>
          <Text light> Confirmed order delivery </Text>
        </Text>
      </View>
      <View style={styles.imageBox}>
        <TouchableWithoutFeedback
          onPress={() => actions.onPressShopOrderDetail(data.reference.orderId)}>
          <View>
            <Text>{dotIcon}</Text>
          </View>
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
