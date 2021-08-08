export type PictureType = {
  imageName: string;
  imageType: string;
  imagePath: string;
};

export type imageSelectionType = {
  raw: boolean;
  image: PictureType;
};

export type FileNameDataType = {
  userId?: number;
  userName?: string;
  shopId?: number;
  shopName?: string;
  categoryName?: string;
};
