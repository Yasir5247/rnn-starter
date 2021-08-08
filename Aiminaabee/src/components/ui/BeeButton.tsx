import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ActivityIndicator
} from "react-native";

import { View, Text } from 'react-native-ui-lib';


type BeeButtonProps = {
  title: string;
  icon?: string;
  loadingStatus?: boolean;
  onPress: () => void;
};


export const BeeButton: React.FC<BeeButtonProps> = ({ title, icon, loadingStatus, onPress, }: BeeButtonProps) => {

  const content: React.ReactElement = (
    <View center bg-blackish br20 style={{ height: '100%', width: '100%' }}>
      <View row center>
        {!!icon && (
          <View marginR-m>
            {icon}
          </View>
        )}
        <View>
          <Text buttonText white>{title}</Text>
        </View>
        {!!loadingStatus && (
          <View marginL-m>
            <ActivityIndicator size="small" color={'#fff'} />
          </View>
        )}
      </View>
    </View>
  );

  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity onPress={onPress}> {content} </TouchableOpacity>;
};


