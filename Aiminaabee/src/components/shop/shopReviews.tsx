import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { AirbnbRating } from 'react-native-ratings';

//Constants
const iconSize = 20;

interface ShopReviewProps {
  data: {
    reviewId: number;
    body: string;
    rating: number;
    created_at: any;
    user: {
      userId: number;
      userName: string;
      userAvatar: string;
    };
  };
}

export const ShopReviews: React.FC<ShopReviewProps> = ({ data }) => {
  return (
    <View style={{ width: '100%', padding: 10 }}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Image
            style={{ width: 25, height: 25, borderRadius: 100 }}
            source={{ uri: data.user.userAvatar }}
          />
          <Text style={styles.userNameText}> {data.user.userName}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 12 }}>{data.created_at}</Text>
        </View>
      </View>
      <View style={styles.bodyText}>
        <Text style={{ fontStyle: 'italic' }}>{data.body}</Text>
      </View>
      <View style={styles.ratingBox}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <AirbnbRating
            showRating={false}
            isDisabled={true}
            defaultRating={data.rating}
            count={5}
            size={15}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  soldbyText: {
    marginLeft: 5,
  },
  userNameText: {
    marginLeft: 3,
  },
  iconStyle: {
    width: iconSize,
    height: iconSize,
  },
  bodyText: {
    paddingTop: 10,
  },
  ratingBox: {
    marginTop: 5,
    marginBottom: 5,
  },
});
