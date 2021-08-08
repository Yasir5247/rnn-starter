import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

interface SectionTwoProps {
  data: {
    userId: number;
    followersCount: number;
    followingCount: number;
    follShopsCount: number;
  };
  actions: {
    showFollowers: (userId: number) => void;
    showFollowing: (userId: number) => void;
    showFollowingshops: (userId: number) => void;
  };
}

export const SectionTwo: React.FC<SectionTwoProps> = ({ data, actions }) => {
  return (
    <View flex-1 bg-bgColor center>
      <TouchableWithoutFeedback onPress={() => actions.showFollowers(data.userId)}>
        <View center>
          <Text bold>{data.followersCount}</Text>
          <Text light> Followers </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => actions.showFollowing(data.userId)}>
        <View center paddingH-8>
          <Text bold>{data.followingCount}</Text>
          <Text light> Following </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => actions.showFollowingshops(data.userId)}>
        <View center>
          <Text bold>{data.follShopsCount}</Text>
          <Text light> Following Shops </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
