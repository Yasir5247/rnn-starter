export const defaultShopImages = [
  {
    imageName: 'img-one',
    imageType: 'image/jpeg',
    imagePath:
      'https://aiminaabee-v2.s3-ap-southeast-1.amazonaws.com/shopDefaultProfilePicture/shopDefault1.jpeg',
  },
  {
    imageName: 'img-one',
    imageType: 'image/jpeg',
    imagePath:
      'https://aiminaabee-v2.s3-ap-southeast-1.amazonaws.com/shopDefaultProfilePicture/shopDefault2.jpeg',
  },
  {
    imageName: 'img-one',
    imageType: 'image/jpeg',
    imagePath:
      'https://aiminaabee-v2.s3-ap-southeast-1.amazonaws.com/shopDefaultProfilePicture/shopDefault3.jpeg',
  },
];

export const randomImages = () => {
  return defaultShopImages[Math.floor(Math.random() * 3)].imagePath;
};
