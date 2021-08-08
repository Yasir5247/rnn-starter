import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import {
  CREATE_USER_IMAGE,
  CREATE_USER_AVATAR,
  CREATE_SHOP_IMAGE,
  CREATE_SHOP_AVATAR,
  CREATE_PRODUCT_IMAGES,
  CREATE_PRODUCT_DEFAULT_IMAGE,
  CREATE_PRODUCT_DEFAULT_AVATAR,
} from '../constants/imageUploadTypes';

//types
import { PictureType, FileNameDataType } from '../models/picture';

import { GetSignedUrl_signS3 } from '../requests/mutations/__generated__/GetSignedUrl';
import { FileInput } from '../../__generated__/globalTypes';

export const imagePicker = async (
  height: number = 500,
  width: number = 500,
): Promise<PictureType> => {
  const response = await ImagePicker.openPicker({
    height,
    width,
    compressImageQuality: 0.5,
    cropping: true,
  });

  return {
    imageName: 'aiminaabee-pic',
    imageType: response.mime,
    imagePath: `file://${response.path}`,
  };
};

export const formatFileName = (
  actionType: string,
  fileName: string,
  extraParams: FileNameDataType,
) => {
  let newFilename: string;

  //extracting extra params
  const { userId, userName, shopId, shopName, categoryName } = extraParams ?? {};

  //cleaning file names
  const cleanFileName = fileName ? fileName.toLowerCase().replace(/[^a-z0-9]/g, '.') : null;
  const cleanUserName = userName ? userName.toLowerCase().replace(/[^a-z0-9]/g, '.') : null;
  const cleanShopName = shopName ? shopName.toLowerCase().replace(/[^a-z0-9]/g, '.') : null;
  const cleanCategoryName = categoryName
    ? categoryName.toLowerCase().replace(/[^a-z0-9]/g, '.')
    : null;

  //date format
  const date = moment().format('YYYYMMDD');

  //generating a random string
  const randomString = Math.random().toString(36).substring(2, 7);

  switch (actionType) {
    //user profile
    case CREATE_USER_IMAGE:
      newFilename = `users/${userId}-${cleanUserName}/profilePicture/${date}-${randomString}-${cleanFileName}`;
      break;
    case CREATE_USER_AVATAR:
      newFilename = `users/${userId}-${cleanUserName}/avatar/${date}-${randomString}-${cleanFileName}`;
      break;
    //shop profile
    case CREATE_SHOP_IMAGE:
      newFilename = `shops/${shopId}-${cleanShopName}/shopPhoto/${date}-${randomString}-${cleanFileName}`;
      break;
    case CREATE_SHOP_AVATAR:
      newFilename = `shops/${shopId}-${cleanShopName}/avatar/${date}-${randomString}-${cleanFileName}`;
      break;
    //product default and product pictures
    case CREATE_PRODUCT_IMAGES:
      newFilename = `shops/${shopId}-${shopName}/products/${cleanCategoryName}/${date}-${randomString}-${cleanFileName}`;
      break;
    case CREATE_PRODUCT_DEFAULT_IMAGE:
      newFilename = `shops/${shopId}-${shopName}/products/${cleanCategoryName}/${date}-${randomString}-${cleanFileName}`;
      break;
    case CREATE_PRODUCT_DEFAULT_AVATAR:
      newFilename = `shops/${shopId}-${shopName}/products/${cleanCategoryName}/avatar/${date}-${randomString}-${cleanFileName}`;
      break;
    default:
      break;
  }
  return newFilename!;
};

export const urlToBlob = (url: any): any => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob'; // convert type
    xhr.send();
  });
};

export const uploadToS3 = async (fileArray: FileInput[], signedData: GetSignedUrl_signS3[]) => {
  for (let i = 0; i < fileArray.length; i++) {
    await fetch(signedData[i].signedRequest, {
      method: 'PUT',
      body: await urlToBlob(fileArray[i].file),
    });
  }
};
