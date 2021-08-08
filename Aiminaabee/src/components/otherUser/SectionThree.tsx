import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

//icons
import { sharedIcon } from '../../utils/icons';

interface SectionThreeProps {
  data: data;
  actions: {
    onChatPressed: (convId: string, userId: number, userName: string) => void;
    followUser: (userId: number, status: boolean) => void;
    showOwnedShops: (userId: number) => void;
  };
}

export const SectionThree: React.FC<SectionThreeProps> = ({ data, actions }) => {
  const { userId, userName, userConvId, isFollowing, userLikesCount } = data;
  const followingStatus = isFollowing ? false : true;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={[styles.innerSection, styles.centerStyle]}>
          <View style={[styles.leftButton, { marginRight: 5 }, styles.centerStyle]}>
            <TouchableWithoutFeedback
              onPress={() => actions.onChatPressed(userConvId, userId, userName)}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.buttonText}> Message </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={[styles.middleButton, { marginRight: 5 }, styles.centerStyle]}>
            <TouchableWithoutFeedback onPress={() => actions.followUser(userId, followingStatus)}>
              <View style={{ flexDirection: 'row' }}>
                {isFollowing ? (
                  <Text>{sharedIcon('userCheck')}</Text>
                ) : (
                  <Text>{sharedIcon('userPlus')}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={[styles.rightButton, styles.centerStyle]}>
            <TouchableWithoutFeedback onPress={() => actions.showOwnedShops(userId)}>
              <View style={{ flexDirection: 'row' }}>
                <Text>{sharedIcon('shoppingBag')}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      {userLikesCount === 0 ? (
        <View style={[styles.emptyContainer, styles.centerStyle]}>
          <Text> No likes</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // borderWidth: 1, borderColor: '#000',
  },
  section: {
    // borderWidth: 1, borderColor: '#000',
    borderColor: '#ccc',
    marginBottom: 15,
  },
  innerSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // borderWidth: 1, borderColor: 'red',
  },
  leftButton: {
    padding: 10,
    width: 150,
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: '#A6A9AC',
    backgroundColor: '#FFF',
  },
  middleButton: {
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: '#A6A9AC',
    backgroundColor: '#FFF',
  },
  rightButton: {
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: '#A6A9AC',
    backgroundColor: '#FFF',
  },
  emptyContainer: {
    padding: 8,
    // borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  buttonText: {
    color: '#000',
    fontSize: 17,
  },
  centerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
