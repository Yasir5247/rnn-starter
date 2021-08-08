import { gql } from '@apollo/client';

export const CATEGORY_FEED = gql`
  query CategoryFeed($catId: Int!, $limit: Int!, $offset: Int!, $sort: [Sort!], $filterCat: Int) {
    categoryFeed(
      catId: $catId
      limit: $limit
      offset: $offset
      sort: $sort
      filterCat: $filterCat
    ) {
      id
      __typename
      name
      price
      defaultImage
      formatedName @client
      formatedPrice @client
      category {
        id
        __typename
        name
      }
      isLiked
      isBookmarked
    }
  }
`;
