import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";

import { ImageLoader } from "../../comon/ImageLoader";

let { width } = Dimensions.get("window");

interface RelatedProdGrid {
  id: number;
  data: any;
  actions: any;
}

export const RelatedProdGrid: React.FC<RelatedProdGrid> = ({
  id,
  data,
  actions,
}) => {
  console.log("rendering product related grid component");

  const {
    id: productId,
    name: productName,
    price: productPrice,
    defaultImage,
  } = data;

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <TouchableWithoutFeedback
          onPress={() => actions.showProduct(productId, productName)}
        >
          <View>
            <ImageLoader
              style={styles.prodImageStyle}
              source={{ uri: defaultImage }}
              imageStyle={{ borderRadius: 8 }}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.informationContainer}>
          <View style={{ flex: 1, paddingRight: 5 }}>
            <Text style={styles.productNameText}>{productName} </Text>
          </View>
          <View>
            <Text style={styles.productPriceText}>MVR{productPrice}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // borderWidth: 1, borderColor: 'red',
  },
  productContainer: {
    width: width / 2,
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#fff",
    // borderWidth: 1, borderColor: 'red',
  },
  informationContainer: {
    width: width / 2 - 20,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // borderWidth: 1, borderColor: 'red',
  },
  prodImageStyle: {
    height: 190,
    width: width / 2 - 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },
  productNameText: {
    fontSize: 12,
    color: "#000",
  },
  productPriceText: {
    color: "#000",
    fontSize: 12,
  },
});
