import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import { ImageLoader } from '../../components/comon/ImageLoader';

//types
import { AuthUser_authUser } from '../../requests/__generated__/AuthUser';

//services
import { useServices } from '../../services';

interface UserStats {
  data: AuthUser_authUser;
  actions: any;
}

export const UserStats: React.FC<UserStats> = ({ data, actions }) => {
  //services
  const { t } = useServices();

  return (
    <View center row padding-10>
      <TouchableWithoutFeedback onPress={() => actions.onPressUserImage(data.avatar)}>
        <View center>
          <ImageLoader
            style={styles.userPic}
            imageStyle={{ borderRadius: 100 }}
            source={{ uri: data.avatar }}
          />
        </View>
      </TouchableWithoutFeedback>
      <View flex center row padding-20 style={{ justifyContent: 'space-between' }}>
        <TouchableWithoutFeedback onPress={() => actions.onPressFollowers(data.id)}>
          <View style={styles.followers}>
            <Text style={styles.count}>{data.followersCount}</Text>
            <Text style={styles.statusText}> {t.do('section.profile.letters.following')} </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => actions.onPressFollowing(data.id)}>
          <View style={styles.following}>
            <Text style={styles.count}>{data.followingCount}</Text>
            <Text style={styles.statusText}> {t.do('section.profile.letters.followers')} </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => actions.onPressFollowShops(data.id)}>
          <View style={styles.followingShops}>
            <Text style={styles.count}>{data.followingShopsCount}</Text>
            <Text style={styles.statusText}> {t.do('section.profile.letters.shops')} </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userPic: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 100,
    width: 70,
    height: 70,
  },
  followers: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  following: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  followingShops: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusText: {
    color: '#fff',
  },
});
