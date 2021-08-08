import { gql } from '@apollo/client';

export const PRODUCT_IMAGES = gql`
  query GetProductImages($productId: Int!) {
    getProductImages(productId: $productId) {
      id
      __typename
      productId
      image
    }
  }
`;
