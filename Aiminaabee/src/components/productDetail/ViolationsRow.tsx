import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

export const ViolationsRow: React.FC<any> = ({
  violationId,
  violationName,
  handleViolation,
}) => {
  return (
    <View style={styles.reportRow}>
      <TouchableWithoutFeedback onPress={() => handleViolation(violationId)}>
        <View>
          <Text>{violationName}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  reportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
