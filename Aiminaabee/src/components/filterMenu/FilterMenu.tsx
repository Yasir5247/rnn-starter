import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Feather';

const iconSize = 18;

interface FilterMenuProps {
  data: {
    categoryId: number;
    categoryName: string;
    viewType: number;
  };
  actions: {
    viewChangePress: (viewType: number) => void;
    onFileterButtonPress: () => void;
    onSortButtonPress: () => void;
  };
}

export const FilterMenu: React.FC<FilterMenuProps> = ({ data, actions }: FilterMenuProps) => {
  const [currentView, setCurrentView] = useState<number>(8);

  const filterIcon = <Icon name="filter" size={iconSize} />;
  const sortIcon = <Icon1 name="sort" size={iconSize} />;
  const viewType = <Icon2 name="grid" size={iconSize} />;

  const onViewPressHandler = () => {
    setCurrentView(currentView === 8 ? 9 : 8);
    actions.viewChangePress(currentView);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableWithoutFeedback onPress={() => actions.onFileterButtonPress}>
          <View>
            <Text>
              <Text style={styles.headerText}>FILTER </Text>
              <Text>{filterIcon}</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.box, styles.specific]}>
        <TouchableWithoutFeedback onPress={() => actions.onSortButtonPress()}>
          <Text>
            <Text style={styles.headerText}>SORT </Text>
            <Text>{sortIcon}</Text>
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.box}>
        <TouchableWithoutFeedback onPress={onViewPressHandler}>
          <View>
            <Text>{data.viewType}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    padding: 10,
  },
  specific: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#f2f2f2',
  },
  headerText: {
    fontSize: 14,
    color: '#000',
  },
});
