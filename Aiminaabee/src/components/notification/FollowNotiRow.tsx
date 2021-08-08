import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

//components
import { ImageLoader } from '../comon/ImageLoader';

//types
import { UserNotifications_userNotifications_Follow } from '../../requests/__generated__/UserNotifications';

//services
import { useServices } from '../../services';

interface FollowNotiRowProps {
  data: UserNotifications_userNotifications_Follow;
  actions: {
    toggleFollowUser: (followeeId: number, status: any) => void;
    onPressUser: (followeeId: number, followeeName: string) => void;
  };
}

export const FollowNotiRow: React.FC<FollowNotiRowProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();

  const status = data.from.isFollowing ? false : true;

  return (
    <View style={styles.container}>
      <View style={styles.pictureBox}>
        <TouchableWithoutFeedback onPress={() => actions.onPressUser(data.from.id, data.from.name)}>
          <ImageLoader
            imageStyle={{ borderRadius: 100 }}
            style={{ width: 30, height: 30 }}
            source={{ uri: data.from.avatar }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.messageBox}>
        <Text>
          <TouchableWithoutFeedback
            onPress={() => actions.onPressUser(data.from.id, data.from.name)}>
            <Text bold>{data.from.name}</Text>
          </TouchableWithoutFeedback>
          <Text light>'started following'</Text>
        </Text>
      </View>
      <View style={styles.buttonBox}>
        <Button
          bg-btnBg
          br20
          label={
            status
              ? t.do('section.navigation.button.signUp')
              : t.do('section.navigation.button.signUp')
          }
          onPress={() => actions.toggleFollowUser(data.from.id, status)}
        />
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
    // borderWidth: 1, borderColor: 'green',
  },
  messageBox: {
    paddingLeft: 10,
    paddingRight: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '45%',
    // borderWidth: 1, borderColor: 'green',
  },
  buttonBox: {
    width: '40%',
    paddingHorizontal: 10,
    // borderWidth: 1, borderColor: 'green',
  },
  followingbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 24,
    width: '100%',
    backgroundColor: '#2C2F33',
  },
  followbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 24,
    borderColor: '#2C2F33',
    backgroundColor: '#FFF',
  },
});
