import { gql } from '@apollo/client';

export const GET_ORDER_LOGS = gql`
  query OrderLogs($orderId: Int!, $limit: Int!, $offset: Int!) {
    orderLogs(orderId: $orderId, limit: $limit, offset: $offset) {
      success
      log {
        _id
        __typename
        type
        orderId
        remarks
        created
        formattedDate @client
      }
      error {
        message
      }
    }
  }
`;
