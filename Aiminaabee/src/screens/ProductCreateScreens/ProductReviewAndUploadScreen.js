import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { theme } from '../../../components/Styles/theme';
import Modal from 'react-native-modalbox';
import { Navigation } from 'react-native-navigation';

import { useQuery } from '@apollo/client';
import { productRegisterMutations } from '../../../LocalState/ProductCreateTemp';
import { GET_PRODUCT_CREATE_TEMP } from '../../../LocalState/ProductCreateTemp/queries';

//constants
import {
  CREATE_PRODUCT_IMAGES,
  CREATE_PRODUCT_DEFAULT_IMAGE,
} from '../../../Constants/imageUploadTypes';
import { sizeArray } from '../../../Constants/imageUploadSizes';

//navigation
import { navMethods } from '../../../navigation/methods';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//components
import ReviewContainer from '../ReviewComponents/ReviewContainer';
import ImageView from '../ReviewComponents/ImageView';

//custom hooks
import { useImageUpload } from '../../../hooks/useImageUpload';
import { useCreateProduct } from '../../../requests/mutations/product';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));



const productReivewAndUploadScreen = ({ componentId }) => {

  //custom hooks
  const { mutate: createProduct } = useCreateProduct();
  const { uploadImages: createImages } = useImageUpload(CREATE_PRODUCT_IMAGES, 'productImage');
  const { uploadImages: createDefaultImage } = useImageUpload(CREATE_PRODUCT_DEFAULT_IMAGE, 'productImage');

  //local state
  const { clearTemp } = productRegisterMutations;
  const tempResults = useQuery(GET_PRODUCT_CREATE_TEMP);
  const productTempValues = tempResults?.data?.productCreateTemp ?? [];

  //references
  const productAddLoadingModal = useRef(null);

  //button press
  useNavigationButtonPress(() => {
    navMethods.popToRoot(componentId);
    sleep(2000);
    clearTemp();
  }, componentId, 'cancel');


  const _ProductPostHandler = async () => {

    //set loading state
    productAddLoadingModal.current.open();

    const fileNameData = {
      shopId: parseInt(productTempValues.shopId),
      shopName: productTempValues.shopName,
      categoryName: productTempValues.categoryName,
    };

    //create image array with req dimensions
    const imageArray = productTempValues.productImages;
    // console.log('image array', imageArray);
    // console.log('image array first item', [imageArray[0]]);

    //get the reized images for all the supplied images
    const imagesData = await createImages(
      imageArray,
      [{ maxWidth: 500, maxHeight: 500 }],
      fileNameData,
    );
    //console.log('image data', imagesData);

    //formatting the returned data
    const imageUrls = imagesData.map(image => {
      return { productImage: image.url };
    });
    //console.log('image urls', imageUrls);

    //get default image and avatar for the first image
    const defaultImagesData = await createDefaultImage(
      [imageArray[0]],
      sizeArray,
      fileNameData,
    );
    //console.log('default Image Data', defaultImagesData);

    let defaultImage, avatar;
    for (data of defaultImagesData) {
      if (data.url.includes('avatar')) {
        avatar = data.url;
      } else {
        defaultImage = data.url;
      }
    }

    try {
      //create the product in the database with product images
      await createProduct({
        variables: {
          shopId: parseInt(productTempValues.shopId),
          categoryId: parseInt(productTempValues.categoryId),
          conditionId: parseInt(productTempValues.conditionId),
          name: productTempValues.name,
          description: productTempValues.description,
          defaultImage: defaultImage,
          avatar: avatar,
          price: parseInt(productTempValues.price),
          stock: parseInt(productTempValues.stock),
          pImages: imageUrls,
        },
      });

      //end loading state
      productAddLoadingModal.current.close();

      //send the screen back to root
      Navigation.popToRoot(componentId);

      //clear temp storage
      clearTemp();
    } catch (err) {
      console.log('err2', err);
      console.log('err3', Object.values(err));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 20 }}>
          <View style={styles.imageBox}>
            <ImageView reviewImage={productTempValues.productImages} />
          </View>
          <View style={styles.infoBox}>
            <ReviewContainer data={productTempValues} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableWithoutFeedback onPress={() => _ProductPostHandler()}>
              <View style={styles.buttonDark}>
                <Text style={styles.buttonTextDark}>Upload</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
      <Modal
        style={styles.modal}
        backdrop={true}
        backdropPressToClose={false}
        position={'center'}
        ref={productAddLoadingModal}>
        <View style={styles.innerModalBox}>
          <View>
            <Image
              style={{ height: 100, width: 100 }}
              source={require('../../../assets/Loaders/app_loader.gif')}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

productReivewAndUploadScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.CARD_BACKGROUND_COLOR,
    borderTopWidth: 1,
    borderColor: '#F2F2F2',
  },
  imageBox: {
    padding: 15,
    // backgroundColor: '#2C2F33',
    // borderWidth: 1,
    // borderColor: '#000',
  },
  infoBox: {
    // borderWidth: 1,
    // borderColor: '#000',
  },
  buttonContainer: {
    padding: 15,
  },
  buttonDark: {
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: theme.APP_THEME_DARK_COLOR,
  },
  buttonTextDark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modal: {
    justifyContent: 'flex-start',
    backgroundColor: '#2C2F33',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 4,
  },
  innerModalBox: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 100,
    width: 100,
  },
});

export default productReivewAndUploadScreen;
