/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Sort } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CategoryFeed
// ====================================================

export interface CategoryFeed_categoryFeed_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface CategoryFeed_categoryFeed {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  defaultImage: string;
  formatedName: string | null;
  formatedPrice: number | null;
  category: CategoryFeed_categoryFeed_category;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface CategoryFeed {
  categoryFeed: (CategoryFeed_categoryFeed | null)[] | null;
}

export interface CategoryFeedVariables {
  catId: number;
  limit: number;
  offset: number;
  sort?: Sort[] | null;
  filterCat?: number | null;
}
