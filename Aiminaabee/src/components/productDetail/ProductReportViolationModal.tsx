import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

import { useQuery } from "@apollo/client";
import { GET_VIOLATIONS } from "../../requests/violations";

import { ViolationsRow } from "./ViolationsRow";

interface ProdViolationTypes {
  actions: any;
}

export const ProductReportViolationModal: React.FC<ProdViolationTypes> = ({
  actions,
}) => {
  const { loading, data: violationData } = useQuery(GET_VIOLATIONS);

  if (loading) {
    return (
      <ActivityIndicator style={{ margin: 5 }} size="large" color={"black"} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.reportContainer}>
        {violationData &&
          violationData.getViolations.map((x: any) => (
            <ViolationsRow
              violationId={x.id}
              violationName={x.name}
              {...actions}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  reportContainer: {
    padding: 10,
  },
  commentContainer: {
    height: 100,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  descText: {
    fontSize: 15,
    color: "#000",
  },
  buttonText: {
    color: "#fff",
  },
});
