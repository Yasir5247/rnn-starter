import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

//components
import { FollowerCard } from './FollowerCard';
import { Section } from '../../comon/Section';

//apollo
import { useQuery } from '@apollo/client';
import { GetFeaturedShops } from '../../../requests/__generated__/GetFeaturedShops';
import { GET_FEATURED_SHOPS } from '../../../requests/magicFeed';

//custom hooks
import { useToggleFollowShop } from '../../../requests/mutations/shop';

interface ShopFollowerProps {
  actions: {
    onShopPress: (shopId: number, shopName: string) => void;
  };
}

export const ShopFollower: React.FC<ShopFollowerProps> = ({ actions }: any) => {
  //custom hooks
  const { mutate: followShop } = useToggleFollowShop();

  const { loading, data, refetch } = useQuery<GetFeaturedShops>(GET_FEATURED_SHOPS);

  loading ? <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} /> : null;

  return (
    <View flex-1 marginV-10>
      <Section borderRadius={23}>
        <View style={{ height: 380 }}>
          {data?.getFeaturedShops ? (
            <FollowerCard
              data={{
                shopId: data?.getFeaturedShops.id,
                shopName: data?.getFeaturedShops.name,
                shopImage: data?.getFeaturedShops.avatar,
                isShopFollowed: data?.getFeaturedShops.isShopFollowed,
                numProducts: data?.getFeaturedShops.numProducts,
                numFollowers: data?.getFeaturedShops.numFollowers,
                loadingStatus: loading,
              }}
              actions={{
                followShop: (shopId: any, status: any) =>
                  followShop({ variables: { shopId, status } }),
                onPressNext: () => refetch(),
                showShop: actions.onShopPress,
              }}
            />
          ) : (
            <View center>
              <Text h2>No Shops to Follow</Text>
            </View>
          )}
        </View>
      </Section>
    </View>
  );
};
