import { useApolloClient } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDeactivatePlayerId } from '../requests/mutations/auth';

export const useClearCache = () => {
  //apollo
  const apolloClient = useApolloClient();

  //hooks
  const { mutate: deactivePlayerId } = useDeactivatePlayerId();

  //deactivate playerId
  const deactivatePlayerId = async () => {
    console.log('IN  deactivatePlayerId :>> ');
    const playerId = await AsyncStorage.getItem('@oneSignalPlayerId');

    if (playerId !== null) {
      console.log('playerId :>> ', playerId);

      //if the player id exist for auth user, deactivate
      await deactivePlayerId({ variables: { playerId } });
      await AsyncStorage.setItem('@oneSignalPlayerId', '');
      return;
    }
  };

  //clear cache
  const clearCache = async () => {
    console.log('cache cleared function');

    await apolloClient.clearStore();
    await apolloClient.resetStore();
    await apolloClient.cache.reset();
    await deactivatePlayerId();

    //clear async storage
    await AsyncStorage.setItem('@token', '');
  };

  return { clearCache };
};
