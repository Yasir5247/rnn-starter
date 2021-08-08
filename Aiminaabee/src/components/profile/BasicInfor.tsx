import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//types
import { AuthUser_authUser } from '../../requests/__generated__/AuthUser';

interface UserStatsProps {
  data: AuthUser_authUser;
}

export const UserBasicInfo: React.FC<UserStatsProps> = ({ data }) => {
  return (
    <View style={styles.basicInfor}>
      <Text style={styles.userTextBold}>{data.name}</Text>
      <Text style={styles.userTextLight}>{data.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  basicInfor: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 15,
    flexDirection: 'column',
  },
  userTextBold: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  userTextLight: {
    color: '#fff',
  },
});
