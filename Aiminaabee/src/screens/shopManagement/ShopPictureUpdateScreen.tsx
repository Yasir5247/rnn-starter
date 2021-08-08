import React, { useEffect, useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

//components
import { ShopPictureUploadView } from '../../components/shop/pictureUpload/ShopPictureUploadView';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//services
import { useServices } from '../../services';

//models
import { imageSelectionType } from '../../models/picture';

//constants
import { sizeArray } from '../../constants/imageUploadSizes';

//custom hook
import { useImageUpload } from '../../hooks/useImageUpload';
import { useUpdateShopPicture } from '../../requests/mutations/setting';
import { ImageUploadTypes, FileNameType } from '../../models/fileUpload';

export const ShopPicUpdateScreen: NavigationFunctionComponent = ({
  componentId,
  shopId,
  shopName,
  avatar,
}: any) => {
  //services
  const { nav, t } = useServices();

  //state
  const [shopImage, setShopImage] = useState<imageSelectionType>({
    raw: false,
    image: {
      imageName: '',
      imagePath: avatar,
      imageType: '',
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  //custom hook for image upload
  const { uploadImages } = useImageUpload(
    ImageUploadTypes.CREATE_SHOP_IMAGE,
    FileNameType.SHOP_PHOTO,
  );
  const { mutate: updateShopPicture } = useUpdateShopPicture();

  //button press
  useNavigationButtonPress(() => nav.popToRoot(componentId), componentId, 'updateShopPic');

  const getSelectedProfilePicture = async (shopId: number, shopName: string) => {
    if (shopImage.raw) {
      /**
       * If the image is selected from default images
       * no need to resize and upload pictures to s3
       * instead send back the picture url.
       */
      return { shopPic: shopImage.image.imagePath, avatar: shopImage.image.imagePath };
    } else {
      //construct file name
      const fileNameData = { shopId, shopName };

      //image object into an array
      const imageArray = [shopImage.image];

      //upload the images to s3
      const signedData = await uploadImages(imageArray, sizeArray, fileNameData);

      let shopPic, avatar;

      for (const data of signedData) {
        if (data.url.includes('avatar')) {
          avatar = data.url;
        } else {
          shopPic = data.url;
        }
      }

      return { shopPic, avatar };
    }
  };

  const shopPictureUpdateHandler = async () => {
    //if the user has not selected from gallery or from default image.
    // return back. no upload is neccessary
    if (!selected) {
      nav.popToRoot(componentId);
    }

    //set loader
    setLoading(true);

    //get the image url from s3
    const { shopPic, avatar } = await getSelectedProfilePicture(shopId, shopName);

    try {
      //update the datbase
      await updateShopPicture({
        variables: {
          shopId: shopId,
          picture: shopPic,
          avatar: avatar,
        },
      });
    } catch (error) {
      setLoading(false);
      console.log('err2', error);
      console.log('err3', Object.values(error));
    }

    //set loading
    setLoading(true);

    //send the screen back to root
    nav.pop(componentId);
  };

  return (
    <View flex-1 bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <ShopPictureUploadView
          data={{
            image: shopImage,
            loading: loading,
          }}
          actions={{
            handleGallerySelection: (image: imageSelectionType) => {
              setSelected(true);
              setShopImage(image);
            },
            handleDefultSelection: (image: imageSelectionType) => {
              setSelected(true);
              setShopImage(image);
            },
          }}
        />
        <View marginH-20 style={{ height: 40 }}>
          <Button
            bg-btnBg
            h1
            br20
            label={t.do('section.appWideButtons.button.update')}
            onPress={() => shopPictureUpdateHandler()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

ShopPicUpdateScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
