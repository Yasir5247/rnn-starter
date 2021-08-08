import React from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

interface SectionOneProps {
  data: {
    userId: number;
    userName: string;
    userPicture: string;
  };
  actions: {
    onPressUserImage: (picture: string) => void;
  };
}

export const SectionOne: React.FC<SectionOneProps> = ({ data, actions }) => {
  return (
    <View style={styles.sectionOne}>
      <TouchableWithoutFeedback onPress={() => actions.onPressUserImage(data.userPicture)}>
        <Image style={styles.userPic} source={{ uri: data.userPicture }} />
      </TouchableWithoutFeedback>
      <Text>
        <Text style={styles.userNameText}>{data.userName.toLowerCase()}</Text>
        {/* <Text>{userId}</Text> */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionOne: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 10,
    // borderWidth: 1, borderColor: '#000'
  },
  userPic: {
    borderRadius: 100,
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  userNameText: {
    fontSize: 18,
    color: '#000',
  },
});
