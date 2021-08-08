import { gql } from '@apollo/client';

export const GET_FRIENDS_LIKED_FEED = gql`
  query FriendsNots($limit: Int!, $offset: Int!) {
    friendsNots(limit: $limit, offset: $offset) {
      id
      name
      avatar
      shop {
        id
        name
      }
      likedUsers {
        id
        name
        avatar
      }
    }
  }
`;
