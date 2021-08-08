import React, { useEffect, useRef, useState } from 'react';
import { Platform, TouchableWithoutFeedback, Image } from 'react-native';
import { View, Text, Colors, TextField } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//local state
import { userRegisterMutations } from '../../localState/UserCreateTemp';
import { userCreateTempVar } from '../../localState';

//types
import { PictureType } from '../../models/picture';

//Services
import { useServices } from '../../services';
import { sharedIcon } from '../../utils/icons';

// funcs
import { imagePicker } from '../../utils/fileUploadFuncs';

export const UploadPictureScreen: NavigationFunctionComponent = ({ componentId }) => {
  const [profilePic, setProfilePic] = useState<PictureType>();
  const [error, setError] = useState<string>('');

  //local state
  const { updateUser } = userRegisterMutations;
  const userCreateTemp = userCreateTempVar();

  //services
  const { nav, t } = useServices();

  //button press
  useNavigationButtonPress(
    (profilePic) => {
      if (profilePic !== null) {
        setError('Please set a profile picture');
      } else {
        updateUser({ ...userCreateTemp, picture: profilePic });
        nav.push(componentId, 'UserContactScreen');
      }
    },
    componentId,
    'next',
  );

  const loadGalleryScreen = async () => {
    console.log('im called');
    const image = await imagePicker(200, 200);
    setProfilePic({ ...image });
  };

  return (
    <View flex-1 center padding-15 bg-white style={{ marginTop: Platform.OS === 'ios' ? 140 : 0 }}>
      <View style={{ width: 100, height: 100, borderWidth: 1, borderColor: '#000' }}>
        <TouchableWithoutFeedback onPress={() => loadGalleryScreen()}>
          {profilePic ? (
            <View>
              <Image
                style={{ height: 100, width: 100, borderRadius: 100 }}
                source={{ uri: profilePic.imagePath }}
              />
            </View>
          ) : (
            <View>
              <Text>Select Picture</Text>
            </View>
          )}
        </TouchableWithoutFeedback>
        <View center marginT-10>
          <View>
            <Text> Select Picture</Text>
          </View>
        </View>
      </View>
      {error ? (
        <View>
          <Text>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

UploadPictureScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
    },
  },
};
