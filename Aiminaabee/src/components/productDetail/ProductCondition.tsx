import React, { useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

import { useQuery } from "@apollo/client";
import { GET_PRODUCT_CONDITION } from "../../requests/product";

export const ProductCondition: React.FC<any> = ({ productId }) => {
  const { loading, data } = useQuery(GET_PRODUCT_CONDITION, {
    variables: { productId: productId },
  });

  if (loading) {
    <ActivityIndicator style={{ margin: 5 }} size="large" color={"black"} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.conditionText}>{data?.getProductCondition.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#2C2F33",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 24,
    padding: 10,
  },
  conditionText: {
    color: "#fff",
  },
});
