import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";

let { width } = Dimensions.get("window");

interface ImageLoaderProps {
  style: any;
  source: any;
  children?: React.ReactNode;
  imageStyle?: any;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  style,
  source,
  children,
  ...other
}: any) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <ImageBackground
      onLoadStart={() => setLoading(true)}
      onLoadEnd={() => setLoading(false)}
      source={error ? require("../../assets/images/appIcon.png") : source}
      onError={() => setError(true)}
      {...other}
      style={[style, styles.center]}
    >
      {loading ? <ActivityIndicator size="small" /> : children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
