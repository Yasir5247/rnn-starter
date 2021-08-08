import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

//components
import { ImageLoader } from '../../comon/ImageLoader';

//services
import { useServices } from '../../../services';

interface UserRowProps {
  data: any;
  actions: any;
}

export const UserRow: React.FC<UserRowProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();

  const { userId, userName, userAvatar, isFollowing, followersCount } = data ?? {};

  const status = isFollowing ? 0 : 1;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <TouchableWithoutFeedback onPress={() => actions.onItemPressed(userId, userName)}>
            <View>
              <ImageLoader
                style={{ width: 40, height: 40 }}
                imageStyle={{ borderRadius: 100 }}
                source={{ uri: userAvatar }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.userNameContainer}>
          <Text style={styles.userNameText}>{userName}</Text>
          <Text style={styles.followersNameText}>{followersCount} Followers</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            bg-btnBg
            br20
            label={
              status
                ? t.do('section.appWideButtons.button.follow')
                : t.do('section.navigation.button.unfollow')
            }
            onPress={() => actions.toggleFollowUser(userId, status)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '15%',
    // borderWidth: 1,
    // borderColor: '#000'
  },
  userNameContainer: {
    flex: 1,
    paddingLeft: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: '55%',
    // borderWidth: 1,
    // borderColor: '#000'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '30%',
    // borderWidth: 1,
    // borderColor: '#000'
  },
  userNameText: {
    color: '#000',
    fontSize: 14,
  },
  followersNameText: {
    color: '#000',
    fontSize: 14,
  },
});
