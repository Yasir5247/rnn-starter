import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, ActivityIndicator, Text, View } from 'react-native';

import { ImageLoader } from '../../comon/ImageLoader';

//funcs
import { imagePicker } from '../../../utils/fileUploadFuncs';
import { sizeArray } from '../../../constants/imageUploadSizes';

//custom hooks
import { useUploadUserPicture } from '../../../hooks/useUploadUserPicture';
import { useUpdateUserProfilePicture } from '../../../requests/mutations/setting';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const cameraIcon = <Icon name="camera-plus-outline" size={25} color="#fff" />;

interface PictureEditProps {
  data: {
    id: number;
    name: string;
    avatar: string;
  };
}

export const ProfilePictureEdit: React.FC<PictureEditProps> = ({ data }) => {
  //state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //custom hook for image upload
  const { handleImageUpload } = useUploadUserPicture();
  const { mutate: updateUserProfilePic } = useUpdateUserProfilePicture();

  //select image from image picker and upload it
  const _selectImage = async () => {
    const images = await imagePicker(200, 200);
    await _updateUserInfo([images]);
  };

  const _updateUserInfo = async (imageArray: any) => {
    setIsLoading(true);

    try {
      //construct file name
      const fileNameData = { userId: data.id, userName: data.name };

      //upload images
      const { profilePic, avatar } = await handleImageUpload(imageArray, sizeArray, fileNameData);

      await updateUserProfilePic({
        variables: {
          userId: data.id,
          picture: profilePic,
          avatar: avatar,
        },
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log('err2', err);
      console.log('err3', Object.values(err));
    }
  };

  return (
    <View style={styles.profilePicContainer}>
      <View style={styles.profileImageBox}>
        {isLoading ? (
          <View>
            <ActivityIndicator style={{ margin: 5 }} size="small" color={'#000'} />
          </View>
        ) : (
          <View>
            <ImageLoader
              style={{ width: 80, height: 80 }}
              source={{ uri: data.avatar }}
              imageStyle={{ borderRadius: 100 }}
            />
          </View>
        )}
      </View>
      <View style={{ marginLeft: 10 }}>
        <TouchableWithoutFeedback onPress={_selectImage}>
          <View style={styles.cameraBox}>
            <Text>{cameraIcon}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 35,
  },
  profileImageBox: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderColor: '#CCC',
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  cameraBox: {
    backgroundColor: '#2C3747',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 80,
    height: 80,
  },
});
