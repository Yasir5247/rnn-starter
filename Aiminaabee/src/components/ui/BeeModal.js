import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modalbox";

const BeeModal = ({ modalRef, heading, modalHeight, children }) => {
  return (
    <Modal
      style={[styles.modal, { height: modalHeight }]}
      backdrop={true}
      useNativeDriver={false}
      backdropPressToClose={true}
      swipeArea={100}
      position={"bottom"}
      ref={modalRef}
    >
      <View style={[{ height: modalHeight }]}>
        <View style={styles.headerBox}>
          <Text style={styles.headingText}>{heading}</Text>
        </View>
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-start",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20
  },
  headerBox: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "#f2f2f2",
  },
  headingText: {
    fontSize: 18,
    color: "#000",
  },
});

export default BeeModal;
