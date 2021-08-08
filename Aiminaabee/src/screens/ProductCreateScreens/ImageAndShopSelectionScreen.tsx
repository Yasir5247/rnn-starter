import React, { useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';
import Modal from 'react-native-modalbox';

import { ImageViewer } from '../../components/productCreate/ImageViewer';
import { CategorySelectionModal } from '../../components/productCreate/CategorySelectionModal';
import { NextButton } from '../../components/productCreate/NextButton';

//services
import { useServices } from '../../services';

//apollo
import { productCreateTempVar } from '../../services/client/cache';
import { productRegisterMutations } from '../../localState/ProductCreateTemp';

export const ImageSelectionScreen: NavigationFunctionComponent = ({
  componentId,
  shopId,
  shopName,
  categoryId,
}: any) => {
  //services
  const { nav, t } = useServices();

  //ref
  const prodCatSelectionModalRef = useRef<any>(null);

  //local state
  const { updateProduct } = productRegisterMutations;
  const productTempValues = productCreateTempVar();
  const localProdImages = productTempValues.productImages ?? [];
  const isSelectedImage = localProdImages.length ? true : false;

  return (
    <View flex-1 bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior={'always'} showsVerticalScrollIndicator={false}>
        <ImageViewer />
        <NextButton
          data={{
            isImage: isSelectedImage,
          }}
          actions={{
            onPressSelectedShop: () => prodCatSelectionModalRef.current.open(),
          }}
        />
      </ScrollView>
      <Modal
        style={styles.modal}
        backdrop={true}
        useNativeDriver={false}
        backdropPressToClose={true}
        swipeArea={20}
        position={'bottom'}
        ref={prodCatSelectionModalRef}>
        <CategorySelectionModal
          data={{
            categoryId: categoryId,
          }}
          actions={{
            onPressCategorySelection: (catId: number, catName: string) => {
              updateProduct({ shopId: shopId });
              updateProduct({ shopName: shopName });
              updateProduct({ categoryId: catId });
              updateProduct({ categoryName: catName });
              nav.push(componentId, 'AddProductInforScreen');
              prodCatSelectionModalRef.current.close();
            },
          }}
        />
      </Modal>
    </View>
  );
};

ImageSelectionScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    height: '70%',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonContainer: {
    padding: 5,
  },
  button: {
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#ccc',
  },
});
