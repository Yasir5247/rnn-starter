import React from 'react';
import { View } from 'react-native-ui-lib';

import { AirbnbRating } from 'react-native-ratings';

interface BeeRatingProps {
  data: {
    name: string;
    reviews: string[];
    ratingNumber: number;
    count: number;
    size: number;
  };
  actions: {
    handleRatingChange: (name: string, value: number) => void;
  };
}

export const BeeRating: React.FC<BeeRatingProps> = ({ data, actions }) => {
  return (
    <View flex bg-bgColor>
      <AirbnbRating
        reviews={data.reviews}
        showRating={true}
        isDisabled={false}
        defaultRating={data.ratingNumber}
        count={data.count}
        size={data.size}
        onFinishRating={(value) => actions.handleRatingChange(data.name, value)}
      />
    </View>
  );
};
