import { useApolloClient } from '@apollo/client';
import { GET_SHOP_CONVER_ID, GET_USER_CONVER_ID } from '../requests/chat';
import { ShopConvId, ShopConvIdVariables } from '../requests/__generated__/ShopConvId';
import { UserConvId, UserConvIdVariables } from '../requests/__generated__/UserConvId';

export const useGetConversationIds = () => {
  //apollo
  const apolloClient = useApolloClient();

  const getShopConvId = async ({ userId, shopId }: { userId: number; shopId: number }) => {
    try {
      const response = await apolloClient.mutate<ShopConvId, ShopConvIdVariables>({
        mutation: GET_SHOP_CONVER_ID,
        variables: { userId: userId, shopId: shopId },
      });
      return response.data!.shopConvId!.converId;
    } catch (error) {
      console.log('error', error);
    }
  };

  const getUserConvId = async (userId: number) => {
    try {
      const response = await apolloClient.mutate<UserConvId, UserConvIdVariables>({
        mutation: GET_USER_CONVER_ID,
        variables: { userId: userId },
      });
      return response.data?.userConvId?.converId;
    } catch (error) {
      console.log('error', error);
    }
  };

  return { getShopConvId, getUserConvId };
};
