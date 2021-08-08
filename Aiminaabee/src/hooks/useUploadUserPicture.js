import { CREATE_USER_IMAGE } from "../constants/imageUploadTypes";
import { useImageUpload } from "../hooks/useImageUpload";

export const useUploadUserPicture = () => {
  //hooks
  const { uploadImages } = useImageUpload(CREATE_USER_IMAGE, "profilePhoto");

  //upload image to S3 based on image type
  const handleImageUpload = async (imageArray, sizeArray, fileNameData) => {
    let profilePic, avatar;

    const signedData = await uploadImages(imageArray, sizeArray, fileNameData);

    for (data of signedData) {
      if (data.url.includes("avatar")) {
        avatar = data.url;
      } else {
        profilePic = data.url;
      }
    }

    return { profilePic, avatar };
  };

  return { handleImageUpload };
};
