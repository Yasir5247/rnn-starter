import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

//components
import { ImageLoader } from '../comon/ImageLoader';

//types
import { UserNotifications_userNotifications_NewOrder } from '../../requests/__generated__/UserNotifications';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const dotIcon = <Icon name="dots-horizontal" size={30} color="#999" />;

interface NewOrderRowProps {
  data: UserNotifications_userNotifications_NewOrder;
  actions: {
    onPressShopOrderDetail: (orderId: number) => void;
    onPressUser: (followeeId: number, followeeName: string) => void;
  };
}

export const NewOrderRow: React.FC<NewOrderRowProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.pictureBox}>
        <TouchableWithoutFeedback onPress={() => actions.onPressUser(data.from.id, data.from.name)}>
          <ImageLoader
            imageStyle={{ borderRadius: 100 }}
            style={styles.imageStyle}
            source={{ uri: data.from.avatar }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.messageBox}>
        <View>
          <Text>
            <Text bold>{data.from.name} </Text>
            <Text light>Ordered the following products from your shop </Text>
            <Text bold>THIS SHOULD BE YOUR SHOP </Text>
          </Text>
        </View>
        <View style={styles.productImageBox}>
          {data.reference.products?.map((x) => (
            <View style={styles.productImage}>
              <ImageLoader
                style={styles.imageStyle}
                imageStyle={{ borderRadius: 0 }}
                source={{ uri: x.defaultImage }}
              />
            </View>
          ))}
        </View>
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
    flexDirection: 'row',
    paddingVertical: 10,
    // borderWidth: 1, borderColor: '#000'
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
  productImageBox: {
    paddingVertical: 5,
    flexDirection: 'row',
    // borderWidth: 1, borderColor: '#000'
  },
  productImage: {
    borderWidth: 1,
    borderColor: '#f2f2f2',
    marginRight: 5,
  },
  imageBox: {
    width: '15%',
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // borderWidth: 1, borderColor: '#000'
  },
});
