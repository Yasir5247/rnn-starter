import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
const swapIcon = <Icon name="swap" size={30} color="#000" />;

export const FriendsEmptyScreen = ({ onRefresh }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            {/* <Image
              style={styles.imageStyle}
              source={require("../../assets/faces/yasir.jpeg")}
            /> */}
          </View>
          <View style={styles.middleImageContainer}>
            <Text>{swapIcon}</Text>
          </View>
          <View>
            {/* <Image
              style={styles.imageStyle}
              source={require("../../assets/faces/suzan.jpeg")}
            /> */}
          </View>
        </View>
        <View style={{ marginTop: 10, justifyContent: "center" }}>
          <Text style={styles.textStyle}>
            both must follow each other to become friends in Aiminaabee
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={onRefresh.bind(this)}>
          <View style={styles.refreshButtonContainer}>
            <Text style={{ color: "#fff" }}>Refresh</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  innerContainer: {
    width: "70%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // borderWidth: 1,
    // borderColor: '#000'
  },
  middleImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingRight: 10,
    paddingLeft: 10,
  },
  refreshButtonContainer: {
    marginTop: 20,
    padding: 10,
    width: 200,
    backgroundColor: "#2C2F33",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginRight: 5,
  },
  textStyle: {
    fontSize: 18,
    textAlign: "center",
  },
});
