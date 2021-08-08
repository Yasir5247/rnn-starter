import React from 'react';
import { ActivityIndicator, Text, ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';

import { useQuery } from '@apollo/client';

import { Holder } from './Holder';
import { AUTH_USER_SAVES } from '../../requests/users';

const LIMIT = 30;

export const SavedProductScroller: React.FC = () => {
  //query
  const { loading, data } = useQuery(AUTH_USER_SAVES, {
    variables: { limit: LIMIT, offset: 0 },
  });

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View flex-1 bg-bgColor>
      {data && data.authUserSaves.length ? (
        <View flex-1>
          <ScrollView
            horizontal={true}
            style={{
              paddingTop: 10,
              paddingLeft: 10,
              flexDirection: 'row',
              height: 300,
            }}
            showsHorizontalScrollIndicator={false}>
            {data.authUserSaves.map((prod: any) => (
              <Holder
                data={{
                  productId: prod.id,
                  productName: prod.name,
                  productPrice: prod.price,
                  productImage: prod.defaultImage,
                  isLiked: prod.isLiked,
                  isInCart: prod.isInCart,
                }}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View center style={{ height: 300 }}>
          <View>
            <Text>your saves will appare here</Text>
          </View>
        </View>
      )}
    </View>
  );
};
