import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { View, Button, Text, Colors } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { userCreateTempVar } from '../../localState';
import { userRegisterMutations } from '../../localState/UserCreateTemp';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//Services
import { useServices } from '../../services';

//utilFuncs
import { sizeArray } from '../../constants/imageUploadSizes';

//custom hook
import { useUploadUserPicture } from '../../hooks/useUploadUserPicture';
import { useLocalSignup, useRegisterPlayerId } from '../../requests/mutations/auth';
import { useUpdateUserProfilePicture } from '../../requests/mutations/setting';
import { useClearCache } from '../../hooks/useClearCache';

export const SplashScreen: NavigationFunctionComponent = ({ componentId }) => {
  //state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //services
  const { nav, t } = useServices();

  //local state
  const userCreateTemp = userCreateTempVar();
  const { clearTemp } = userRegisterMutations;

  //cutom hooks
  const { mutate: registerPlayerId } = useRegisterPlayerId();
  const { mutate: createUser } = useLocalSignup();
  const { mutate: updateUserProfilePicture } = useUpdateUserProfilePicture();
  const { handleImageUpload } = useUploadUserPicture();
  const { clearCache } = useClearCache();

  //button press
  useNavigationButtonPress(() => nav.popToRoot(componentId), componentId, 'cancel');

  //set oneSignal playerId
  const setPlayerId = async () => {
    const playerId = await AsyncStorage.getItem('@oneSignalPlayerId');
    await registerPlayerId({ variables: { playerId } });
    return;
  };

  const uploadUserProfilePicture = async ({ userId }: { userId: number }) => {
    //from local storage
    const { name, picture } = userCreateTemp;
    //construct file name
    const fileNameData = { userId: userId, userName: name };
    //image object into an array
    const imageArray = [picture];
    //upload images
    const { profilePic, avatar } = await handleImageUpload(imageArray, sizeArray, fileNameData);
    return { profilePic, avatar };
  };

  const authHandler = async () => {
    setIsLoading(true);

    try {
      //save the user in database
      const response = await createUser({
        variables: {
          ...userCreateTemp,
          method: 'local',
        },
      });

      //extract the token
      const { user, token } = response.data!.signup;

      //upload user picture
      const { profilePic, avatar } = await uploadUserProfilePicture({
        userId: user.id,
      });
      await updateUserProfilePicture({
        variables: {
          userId: user.id,
          picture: profilePic,
          avatar: avatar,
        },
      });

      setIsLoading(false);

      //set async storage
      await AsyncStorage.setItem('@token', token);

      //set playerId
      setPlayerId();

      //navigate to the tab screen
      // await startTabScreen();

      //clear cache and local state before sigin in the user
      clearCache();
      clearTemp();
    } catch (err) {
      setIsLoading(false);
      console.log('err2', err);
      console.log('err3', Object.values(err));
    }
  };

  return (
    <View flex padding-15 bg-white>
      <View flex-1 center>
        <Text h2> Awesome, You did it </Text>
        <Text h1> Welcome to aiminaabee {userCreateTemp.name} </Text>
      </View>
      <View flex-1>
        <Button
          bg-btnBg
          br20
          label={t.do('section.navigation.button.signUp')}
          onPress={() => authHandler()}
        />
      </View>
    </View>
  );
};

SplashScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
