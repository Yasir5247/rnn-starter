import { gql } from '@apollo/client';

export const USER_NOTIFICATIONS = gql`
  query UserNotifications($limit: Int!, $offset: Int!) {
    userNotifications(limit: $limit, offset: $offset) @connection(key: "userNotifications") {
      ... on Follow {
        id
        __typename
        from {
          id
          __typename
          name
          avatar
          isFollowing
        }
      }
      ... on NewOrder {
        id
        __typename
        seenStatus
        from {
          id
          __typename
          name
          avatar
        }
        to {
          id
          __typename
          name
          avatar
        }
        reference {
          orderId
          products {
            id
            name
            defaultImage
          }
        }
      }
      ... on OrderShipped {
        id
        __typename
        # seenStatus
        from {
          id
          __typename
          name
          avatar
        }
        to {
          id
          __typename
          name
          avatar
        }
        reference {
          orderId
        }
      }
      ... on OrderDelivered {
        id
        __typename
        seenStatus
        from {
          id
          __typename
          name
          avatar
        }
        to {
          id
          __typename
          name
          avatar
        }
        reference {
          orderId
        }
      }
      ... on OrderCancelled {
        id
        __typename
        seenStatus
        from {
          id
          __typename
          name
          avatar
        }
        to {
          id
          __typename
          name
          avatar
        }
        reference {
          orderId
        }
      }
      ... on ShopInvite {
        id
        __typename
        seenStatus
        from {
          id
          __typename
          name
          avatar
        }
        to {
          id
          __typename
          name
          avatar
        }
        reference {
          owner {
            id
            name
            avatar
          }
        }
      }
    }
  }
`;

export const USER_NOTIFICATION_COUNT = gql`
  query UserNotificationCount {
    userNotificationCount {
      success
      count
    }
  }
`;
