import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import Swiper from "react-native-swiper";
import { ImageLoader } from "../../components/comon/ImageLoader";
import { ProductCondition } from "./ProductCondition";

import { useQuery } from "@apollo/client";
import { PRODUCT_IMAGES } from "../../requests/productImage";

export const ProductImages: React.FC<any> = ({
  productId,
  onPressProductImage,
}) => {
  const { loading, data } = useQuery(PRODUCT_IMAGES, {
    variables: { productId: productId },
  });

  if (loading) {
    <ActivityIndicator style={{ margin: 5 }} size="large" color={"black"} />;
  }

  const images = data ? data?.getProductImages.map((x: any) => x.image) : [];

  return (
    <View style={styles.container}>
      <View style={styles.productImage}>
        <Swiper showsPagination={true}>
          {images.map((x: any) => (
            <TouchableWithoutFeedback
              onPress={() => onPressProductImage(images)}
            >
              <ImageLoader
                style={{ height: 520, width: "100%" }}
                source={{ uri: x }}
              />
            </TouchableWithoutFeedback>
          ))}
        </Swiper>
      </View>
      <View style={styles.conditionBox}>
        <ProductCondition productId={productId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1, borderColor: '#000'
  },
  productImage: {
    height: 520,
  },
  conditionBox: {
    position: "absolute",
    width: 150,
    top: 10,
    right: 10,
  },
});
