import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';

import { ImageLoader } from '../../comon/ImageLoader';
import { FriendsInvite_friendsInvite } from '../../../requests/__generated__/FriendsInvite';

interface FriendsInProps {
  data: FriendsInvite_friendsInvite;
  actions: {
    onItemPressed: (id: number, name: string) => void;
    inviteShop: (userId: number) => void;
  };
}

export const FriendsInviteRow: React.FC<FriendsInProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <TouchableWithoutFeedback onPress={() => actions.onItemPressed(data.id, data.name)}>
            <View>
              <ImageLoader
                style={{ width: 40, height: 40 }}
                imageStyle={{ borderRadius: 100 }}
                source={{ uri: data.avatar }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.userNameContainer}>
          <Text style={styles.userNameText}>{data.name}</Text>
        </View>

        <View style={styles.buttonContainer}>
          {!data.wasInvited ? (
            <TouchableWithoutFeedback onPress={() => actions.inviteShop(data.id)}>
              <View style={styles.followbtn}>
                <Text style={[styles.followButtonText, { color: '#000' }]}> Invite</Text>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View>
              <Text> Invited</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const buttonWidth = 120;
const buttonPadding = 10;

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
  },
  userNameContainer: {
    flex: 1,
    paddingLeft: 8,
    justifyContent: 'center',
    alignContent: 'center',
  },
  userNameText: {
    fontSize: 14,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  followingbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    width: buttonWidth,
    padding: buttonPadding,
    backgroundColor: '#2C2F33',
  },
  followbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: buttonWidth,
    padding: buttonPadding,
    borderWidth: 0.5,
    borderColor: '#2C2F33',
    backgroundColor: '#FFF',
  },
  followButtonText: {
    fontSize: 14,
  },
});
