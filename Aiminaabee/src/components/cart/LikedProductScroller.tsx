import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';

import { useQuery } from '@apollo/client';

import { Holder } from './Holder';

import { USER_LIKES } from '../../requests/users';

const LIMIT = 30;

export const LikedProductScroller: React.FC = () => {
  //query
  const { loading, data } = useQuery(USER_LIKES, {
    variables: { userId: 0, limit: LIMIT, offset: 0 },
  });

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View style={styles.container}>
      {data && data.userLikes.length ? (
        <View style={{ flex: 1 }}>
          <ScrollView
            horizontal={true}
            style={styles.prodScroller}
            showsHorizontalScrollIndicator={false}>
            {data.userLikes.map((prod: any) => (
              <Holder
                data={{
                  productId: prod.id,
                  productImage: prod.defaultImage,
                  productName: prod.name,
                  productPrice: prod.price,
                  isLiked: prod.isLiked,
                  isInCart: prod.isInCart,
                }}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <View>
            <Text>Your likes will appare here</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  lookUpText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  prodScroller: {
    paddingTop: 10,
    paddingLeft: 10,
    height: 300,
  },
});
