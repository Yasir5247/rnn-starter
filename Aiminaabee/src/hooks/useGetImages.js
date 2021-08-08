import React, { useEffect, useRef, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useImageUpload } from './useImageUpload';


export const useGetImages = (type, typename) => {

   //state
   const [loading, setLoading] = useState(false);
   const [images, setImages] = useState('');

   //hooks
   const { uploadImages } = useImageUpload(type, typename);


   const getImages = async (imageArray, sizeArray, fileNameData) => {

      const signedData = await uploadImages(imageArray, sizeArray, fileNameData);

   }

   return { getImages, data: images, loading }

}