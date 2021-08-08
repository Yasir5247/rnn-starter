import { gql } from '@apollo/client';

export const POPULAR_SHOPS = gql`
  query PopularShops {
    popularShops {
      id
      __typename
      name
      picture
      isShopFollowed
    }
  }
`;

export const POPULAR_SHOP_OWNERS = gql`
  query PopularShopOwners {
    popularShopOwners {
      id
      __typename
      name
      avatar
      isFollowing
      followersCount
    }
  }
`;
