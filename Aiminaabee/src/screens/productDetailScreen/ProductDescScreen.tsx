import React, { useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { View, Button, Text } from "react-native-ui-lib";

import { GET_PRODUCT_DESCRIPTION } from "../../requests/product";
import { useQuery } from "@apollo/client";

//navigation
import { NavigationFunctionComponent } from "react-native-navigation";

export const ProductDescScreen: NavigationFunctionComponent = ({
  componentId,
  prodId,
}: any) => {
  // product detail query
  const { loading, data } = useQuery(GET_PRODUCT_DESCRIPTION, {
    variables: { productId: prodId },
  });

  if (loading) {
    return (
      <ActivityIndicator style={{ margin: 5 }} size="large" color={"black"} />
    );
  }

  return (
    <View flex-1 bg-bgColor padding-10>
      {data && data?.getProductDescription ? (
        <Text h1>{data?.getProductDescription.name}</Text>
      ) : null}
    </View>
  );
};

ProductDescScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
