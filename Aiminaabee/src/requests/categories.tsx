import { gql } from '@apollo/client';
import { CATEGORY_FRAGMENT } from './fragments/fragments';

export const GET_MAIN_CATEGORIES = gql`
  query MainCategories {
    mainCategories {
      id
      __typename
      name
      image
      subCats {
        id
        name
        image
      }
      isSubCat
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($catId: Int!) {
    getCategory(catId: $catId) {
      id
      __typename
      name
    }
  }
`;

export const GET_SUBCATEGORIES = gql`
  query GetSubCategories($catId: Int!) {
    getSubCategories(catId: $catId) {
      id
      __typename
      name
      isSubCat
    }
  }
`;

export const GET_CATEGORY_SUMMARY = gql`
  query GetCategorySummary($catId: Int!, $limit: Int!, $offset: Int!) {
    getCategorySummary(catId: $catId, limit: $limit, offset: $offset) {
      id
      __typename
      name
      displayImage
    }
  }
`;

// export const GET_MAIN_CATEGORIES_SHOP_RELATED_SELECTION = gql`
//   query MainCategories {
//     mainCategories {
//       id
//       __typename
//       name
//       image
//     }
//   }
// `;

export const FILTER_CATEGORIES = gql`
  query filterCategories($catId: Int!) {
    filterCategories(catId: $catId) {
      ...CategoryFragment
      subCats {
        ...CategoryFragment
        subCats {
          ...CategoryFragment
          subCats {
            ...CategoryFragment
          }
        }
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;
