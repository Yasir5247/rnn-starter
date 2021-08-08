import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client';

//queries
import { GET_INVENTORY } from '../../requests/shop';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $shopId: Int!
    $categoryId: Int!
    $conditionId: Int!
    $name: String!
    $description: String!
    $defaultImage: String!
    $avatar: String!
    $price: Int!
    $stock: Int!
    $pImages: [pImageInput]!
  ) {
    createProduct(
      input: {
        shopId: $shopId
        categoryId: $categoryId
        conditionId: $conditionId
        name: $name
        description: $description
        defaultImage: $defaultImage
        avatar: $avatar
        price: $price
        stock: $stock
        pImages: $pImages
      }
    ) {
      id
      __typename
      name
    }
  }
`;

export const TOGGLE_LIKE_STATUS = gql`
  mutation LikeProduct($productId: Int!, $status: Int!) {
    likeProduct(productId: $productId, status: $status) {
      id
      __typename
      isLiked
      numLikes
    }
  }
`;

export const TOGGLE_BOOKMARK_STATUS = gql`
  mutation SaveProduct($productId: Int!, $status: Int!) {
    saveProduct(productId: $productId, status: $status) {
      id
      __typename
      isBookmarked
    }
  }
`;

export const ADD_TO_PRODUCT_LOOKUP = gql`
  mutation AddProductLookup($productId: Int!) {
    addProductLookup(productId: $productId) {
      ok
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: Int!) {
    deleteProduct(productId: $productId) {
      status
      productId
    }
  }
`;

//----------------------------useHooks---------------------------//

export function useToggleLike() {
  const [mutate, { data, error }] = useMutation(TOGGLE_LIKE_STATUS);
  return { mutate, data, error };
}

export function useToggleBookmark() {
  const [mutate, { data, error }] = useMutation(TOGGLE_BOOKMARK_STATUS);
  return { mutate, data, error };
}

export function useCreateProduct() {
  const [mutate, { data, error }] = useMutation(CREATE_PRODUCT, {
    // update: (cache, { data: { createProduct } }) => {
    //    const existing = cache.readQuery({ query: GET_INVENTORY });
    //    cache.writeQuery({
    //       query: GET_INVENTORY,
    //       data: {
    //          ...existing,
    //          getShopInventory: [...existing.getShopInventory, createProduct]
    //       }
    //    })
    // }
  });
  return { mutate, data, error };
}

export function useDeleteProduct() {
  const [mutate, { data, error }] = useMutation(DELETE_PRODUCT, {
    update(cache, { data }) {
      console.log('data-------', data);

      const productId = data?.deleteProduct?.productId;
      const existingData: any = cache.readQuery({ query: GET_INVENTORY });

      cache.writeQuery({
        query: GET_INVENTORY,
        data: {
          getShopInventory: existingData.getShopInventory.filter((x: any) => x.id !== productId),
        },
      });
    },
  });
  return { mutate, data, error };
}

export function useAddToLookup() {
  const [mutate, { data, error }] = useMutation(ADD_TO_PRODUCT_LOOKUP);
  return { mutate, data, error };
}
