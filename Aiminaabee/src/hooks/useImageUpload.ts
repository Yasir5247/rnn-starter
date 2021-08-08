import ImageResizer from 'react-native-image-resizer';
import { formatFileName, uploadToS3 } from '../utils/fileUploadFuncs';
import { useGetSignedUrl } from '../requests/mutations/fileUpload';

//models
import { PictureType, FileNameDataType } from '../models/picture';
import { SizeArrayType, ImageUploadTypes, FileNameType } from '../models/fileUpload';

//types
import { FileInput } from '../../__generated__/globalTypes';

export const useImageUpload = (type: ImageUploadTypes, fileNameType: FileNameType) => {
  //apollo
  const { mutate: getSignedUrl } = useGetSignedUrl();

  //resize image per supplied sizes
  const resizeImage = async (
    image: PictureType,
    size: SizeArrayType,
  ): Promise<PictureType | undefined> => {
    try {
      const { imagePath } = image;
      const { maxWidth = 500, maxHeight = 500 } = size;
      // prettier-ignore
      const newImage = await ImageResizer.createResizedImage(imagePath, maxWidth, maxHeight, 'JPEG', 80);
      const index = newImage.name.lastIndexOf('.');
      const mime = newImage.name.substring(index + 1);
      return {
        imageName: `${fileNameType}-image/${mime}`,
        imageType: `image/${mime}`,
        imagePath: `file://${newImage.path}`,
      };
    } catch (error) {
      console.log({ error });
    }
  };

  //create file name for image and avatar
  const createFileMetadata = (
    image: PictureType,
    fileNameData: FileNameDataType,
    index: number,
  ) => {
    const { imageName, imageType, imagePath } = image;
    if (type === ImageUploadTypes.CREATE_USER_IMAGE) {
      return {
        fileName: formatFileName(
          index == 0 ? ImageUploadTypes.CREATE_USER_IMAGE : ImageUploadTypes.CREATE_USER_AVATAR,
          imageName,
          fileNameData,
        ),
        fileType: imageType,
        file: imagePath,
      };
    } else if (type === ImageUploadTypes.CREATE_SHOP_IMAGE) {
      return {
        fileName: formatFileName(
          index == 0 ? ImageUploadTypes.CREATE_SHOP_IMAGE : ImageUploadTypes.CREATE_SHOP_AVATAR,
          imageName,
          fileNameData,
        ),
        fileType: imageType,
        file: imagePath,
      };
    } else if (type === ImageUploadTypes.CREATE_PRODUCT_DEFAULT_IMAGE) {
      return {
        fileName: formatFileName(
          index == 0
            ? ImageUploadTypes.CREATE_PRODUCT_DEFAULT_IMAGE
            : ImageUploadTypes.CREATE_PRODUCT_DEFAULT_AVATAR,
          imageName,
          fileNameData,
        ),
        fileType: imageType,
        file: imagePath,
      };
    } else {
      return {
        fileName: formatFileName(type, imageName, fileNameData),
        fileType: imageType,
        file: imagePath,
      };
    }
  };

  //get signed data from S3
  const getSignedData = async (fileArray: FileInput[]) => {
    //get signed url

    try {
      const response = await getSignedUrl({
        variables: {
          file: fileArray,
        },
      });

      if (response) {
        const signedData = response.data!.signS3;
        //upload image to S3
        await uploadToS3(fileArray, signedData);
        return signedData;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  //upload image to S3 based on image type
  const uploadImages = async (
    imageArray: PictureType[],
    sizeArray: SizeArrayType[],
    fileNameData: FileNameDataType,
  ) => {
    let resizedImageArray: PictureType[] = [];
    for (const image of imageArray) {
      for (const size of sizeArray) {
        const resizedImage = await resizeImage(image, size);
        if (resizedImage) {
          resizedImageArray.push(resizedImage);
        }
      }
    }
    const fileArray = resizedImageArray.map((image, index) => {
      return createFileMetadata(image, fileNameData, index);
    });
    const signedData = await getSignedData(fileArray);
    return signedData!;
  };

  return { uploadImages };
};
