import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client';

//custom types
import customTypes from '../client/generated/fragmentTypes.json';

//constants
const TAX_AMOUNT = 0.06;

//funcs
import * as func from '../../utils/utilFuncs';
import { offsetLimitPagination } from '@apollo/client/utilities';
import moment from 'moment';

//queries
// import { GET_SHOPPING_CART } from './src/requests/shoppingCart';
// import { AUTH_USER_SHOPS } from './src/requests/users';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        formatedUserName: {
          read(_, { readField }) {
            const name: any = readField('name');
            return func.stringCutter(name, 20);
          },
        },
      },
    },
    Shop: {
      fields: {
        formatedShopName: {
          read(_, { readField }) {
            const name: any = readField('name');
            return func.stringCutter(name, 20);
          },
        },
        isMyShop: {
          read(_, { readField }) {
            // const myShops = cache.readQuery({ query: AUTH_USER_SHOPS });
            // const userShopIds = myShops.authUserShops.map(x => x.id);
            // return userShopIds.includes(readField('id'));
          },
        },
      },
    },
    ShopReview: {
      fields: {
        formattedBody: {
          read(_, { readField }) {
            const body: any = readField('body');
            return func.stringCutter(body, 200);
          },
        },
        formattedData: {
          read(_, { readField }) {
            const created: any = readField('created');
            return moment(created).format('ddd');
          },
        },
      },
    },
    Product: {
      fields: {
        formatedName: {
          read(_, { readField }) {
            const name: any = readField('name');
            return func.stringCutter(name, 20);
          },
        },
        formatedPrice: {
          read(_, { readField }) {
            const price: any = readField('price');
            return `${price.toFixed(2)} mvr`;
          },
        },
        formatedTotalPrice: {
          read(_, { readField }) {
            const price: any = readField('price');
            const userOrderedQty: any = readField('orderQty');
            const totalPrice = price * userOrderedQty;
            return `${Math.round(totalPrice)} mvr`;
          },
        },
        isInCart: {
          read(_, { readField }) {
            // const myCartItems: any = cache.readQuery({ query: GET_SHOPPING_CART });
            // const cartProductIds: any = myCartItems.shoppingCart.map(
            //    (x: { product: { id: any; }; }) => x.product.id,
            // );
            // return cartProductIds.includes(readField('id'));
          },
        },
        isOwner: {
          read(_, { readField }) {
            // const myShops: any = cache.readQuery({ query: AUTH_USER_SHOPS });
            // const userShopIds = myShops.authUserShops.map((x: { id: any; }) => x.id);
            // return userShopIds.includes(readField('shopId'));
          },
        },
      },
    },
    CartItem: {
      fields: {
        subTotal: {
          read(_, { readField }) {
            const productRef: any = readField('product');
            const price: any = readField('price', productRef);
            const userQty: any = readField('userQty');
            return `ރ. ${price * userQty}`;
          },
        },
      },
    },
    ProductOrder: {
      fields: {
        subTotal: {
          read(_, { readField }) {
            const products: any = readField('product');
            let totPrice: number = 0;

            for (let i = 0; i < products.length; i++) {
              const price: any = readField('price', products[i]);
              const orderedQty: any = readField('orderQty', products[i]);
              totPrice += price * orderedQty;
            }
            return `${Math.round(totPrice)}`;
          },
        },
        totalTaxPrice: {
          read(_, { readField }) {
            const totTaxPrice: any = readField('subTotal');
            return `${Math.round(totTaxPrice * TAX_AMOUNT)}`;
          },
        },
        totalPrice: {
          read(_, { readField }) {
            const subTotal: any = readField('subTotal');
            const totalTaxPrice: any = readField('totalTaxPrice');
            const finalPrice: number = subTotal + totalTaxPrice;
            return `ރ. ${Math.round(finalPrice)}`;
          },
        },
      },
    },
    OrderLog: {
      fields: {
        formattedDate: {
          read(_, { readField }) {
            // return moment(readField('created')).format('MMM Do YYYY');
          },
        },
      },
    },
    ConverUserUser: {
      fields: {
        formattedDate: {
          read(_, { readField }) {
            // return moment(readField('lastMessageDate')).format('ddd');
          },
        },
        formattedLastMessage: {
          read(_, { readField }) {
            // return func.stringCutter(readField('lastMessage'), 65);
          },
        },
      },
    },
    ConverUserShop: {
      fields: {
        formattedDate: {
          read(_, { readField }) {
            // return moment(readField('lastMessageDate')).format('ddd');
          },
        },
        formattedLastMessage: {
          read(_, { readField }) {
            // return func.stringCutter(readField('lastMessage'), 65);
          },
        },
      },
    },
    ConverShopUser: {
      fields: {
        formattedDate: {
          read(_, { readField }) {
            // return moment(readField('lastMessageDate')).format('ddd');
          },
        },
        formattedLastMessage: {
          read(_, { readField }) {
            // return func.stringCutter(readField('lastMessage'), 65);
          },
        },
      },
    },
    Query: {
      fields: {
        searchShops: {
          keyArgs: ['sort', 'filter', 'searchQuery'],

          merge(existing, incoming, { args: { offset = 0 } }: any) {
            if (!existing) return incoming;
            if (!incoming && !incoming.success) return existing;

            // Slicing is necessary because the existing data is
            // Immutable, and frozen in development.
            const merged = existing.shops ? existing.shops.slice(0) : [];
            for (let i = 0; i < incoming.shops.length; ++i) {
              merged[offset + i] = incoming.shops[i];
            }

            return {
              ...incoming,
              shops: merged,
            };
          },
        },
        getShopInventory: {
          keyArgs: ['shopId', 'sort'],

          merge(existing, incoming, { args: { offset = 0 } }: any) {
            if (!existing) return incoming;
            if (!incoming && !incoming.success) return existing;

            const merged = existing.products ? existing.products.slice(0) : [];
            for (let i = 0; i < incoming.products.length; ++i) {
              merged[offset + i] = incoming.products[i];
            }

            return {
              ...incoming,
              products: merged,
            };
          },
        },
        magicFeed: offsetLimitPagination(),
        exploreFeed: offsetLimitPagination(),
        friendsNots: offsetLimitPagination(),
        getShopProducts: offsetLimitPagination(['shopId']),
        // getShopInventory: offsetLimitPagination(["shopId", "sort"]),
        searchUsers: offsetLimitPagination(),
        searchProducts: offsetLimitPagination(['searchQuery']),
        getConversations: offsetLimitPagination(),
        authUserSaves: offsetLimitPagination(),
        userFriends: offsetLimitPagination(),
        userNotifications: offsetLimitPagination(),
        categoryFeed: offsetLimitPagination(['catId', 'filterCat']),
        // followers: offsetLimitPagination(["userId"]),
        // following: offsetLimitPagination(["userId"]),
        // followingshops: offsetLimitPagination(["userId"]),
        // userLikes: offsetLimitPagination(["userId"]),
        // getShippingAdress: offsetLimitPagination(["default"]),
        // userOrders: offsetLimitPagination(["status"]),
        // shopOrders: offsetLimitPagination(),
        cartSummary: {
          read(existing, { readField }) {
            //get cart from the cache
            const cartItems: any = readField('shoppingCart') || [];
            let subTotal: number = 0;

            for (let i = 0; i < cartItems.length; i++) {
              const productRef: any = readField('product', cartItems[i]);
              const price: any = readField('price', productRef);
              const userQty: any = readField('userQty', cartItems[i]);
              subTotal += price * userQty;
            }

            const totTaxPrice = subTotal * TAX_AMOUNT;
            const finalPrice = subTotal + totTaxPrice;

            return {
              subTotal,
              totTaxPrice,
              finalPrice,
            };
          },
        },
      },
    },
  },
  ...customTypes,
});

//local state variables for user creation
export const userCreateTempVar = makeVar({
  name: '',
  email: '',
  password: '',
  picture: '',
  contact: '',
});

//local state variables for shop creation
export const shopCreateTempVar = makeVar({
  name: '',
  type: '',
  description: '',
  contact: '',
  categoryName: '',
  categoryId: null,
  deliveryLocations: [],
});

//local state variables for product creation
export const productCreateTempVar = makeVar({
  name: '',
  description: '',
  price: '',
  stock: '',
  shopId: '',
  shopName: '',
  categoryId: '',
  categoryName: '',
  conditionId: '',
  conditionName: '',
  productImages: [],
});

//local state variables selected category used
//in the filter screen and other related
//category filter screens
export const selectedCategoryVar = makeVar({
  categoryId: '',
  categoryName: '',
});
