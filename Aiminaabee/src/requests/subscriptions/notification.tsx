import { gql } from '@apollo/client';

export const NOTIFICATION_COUNT_SUBSCRIPTION = gql`
  subscription NumUserNots {
    numUserNots
  }
`;
