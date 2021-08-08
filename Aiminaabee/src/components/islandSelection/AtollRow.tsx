import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
const locationIcon = <Icon name="location-pin" size={20} color="#6FCBD0" />;

interface AtollRowProps {
  islandId: number;
  islandName: string;
  isChecked: boolean;
  atoll: { code: string };
  onPressIsland: (islandId: number, islandName: string) => void;
}

export const AtollRow: React.FC<AtollRowProps> = ({
  islandId,
  islandName,
  atoll,
  onPressIsland,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPressIsland(islandId, islandName)}>
      <View style={styles.locationRow}>
        <View>
          <Text> {locationIcon} </Text>
        </View>
        <View>
          <Text style={styles.locationName}>
            {' '}
            {atoll.code} - {islandName}{' '}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  locationRow: {
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: '#f2f2f2',
  },
  locationName: {
    color: '#000',
    fontSize: 16,
  },
});
