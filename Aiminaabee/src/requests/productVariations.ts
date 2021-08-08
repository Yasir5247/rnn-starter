import { gql } from '@apollo/client';

export const PRODUCT_CONDITIONS = gql`
  query GetProductConditions {
    getProductConditions {
      id
      label
    }
  }
`;
