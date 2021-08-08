import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Colors, Image } from 'react-native-ui-lib';

interface ModalRowProps {
  data: {
    id?: number;
    icon: any;
    title: string;
  };
  actions: {
    onMenuPress: (id?: number) => void;
  };
}

export const ModalRow: React.FC<ModalRowProps> = ({ data, actions }) => {
  return (
    <TouchableWithoutFeedback onPress={() => actions.onMenuPress(data?.id)}>
      <View style={styles.menuRow}>
        {!!data.icon && (
          <View marginR-m>
            <Image assetName="appIcon" style={{ width: 20, height: 20 }} />
          </View>
        )}
        {!!data.title && (
          <Text textColor text60R>
            {data.title}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  menuRow: {
    borderBottomWidth: 0.5,
    borderColor: '#f2f2f2',
    flexDirection: 'row',
    padding: 20,
  },
  menuText: {
    fontSize: 18,
    color: '#000',
  },
});
