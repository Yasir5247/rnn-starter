import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Switch } from 'react-native-ui-lib';

import Icon from 'react-native-vector-icons/AntDesign';
const verifiedIcon = <Icon name="checkcircle" size={15} color="blue" />;
const lastest = <Icon name="totop" size={15} color="black" />;
const popular = <Icon name="heart" size={15} color="black" />;

interface FilterModalContentProp {
  data: {
    isVerified: boolean;
    isLatest: boolean;
  };
  actions: {
    onPressFilterButton: (isVerified: boolean, isLatest: boolean) => void;
  };
}

export const FilterModalContent: React.FC<FilterModalContentProp> = ({ data, actions }) => {
  const [isVerified, setVerfied] = useState<boolean>(data.isVerified);
  const [isLatest, setLatest] = useState<boolean>(data.isLatest);

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Filter</Text>
      </View>
      <View style={styles.filerRowBox}>
        <View>
          <Text style={styles.priceText}>{verifiedIcon} Verified</Text>
        </View>
        <View>
          <Switch
            value={isVerified}
            onValueChange={() => {
              setVerfied(true);
              setLatest(false);
            }}
            onColor={'#000'}
            offColor={'#ccc'}
          />
        </View>
      </View>
      <View style={styles.filerRowBox}>
        <View>
          <Text style={styles.priceText}>{lastest} Latest</Text>
        </View>
        <View>
          <Switch
            value={isLatest}
            onValueChange={() => {
              setLatest(true);
              setVerfied(false);
            }}
            onColor={'#000'}
            offColor={'#ccc'}
          />
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => actions.onPressFilterButton(data.isVerified, data.isLatest)}>
        <View style={{ margin: 10 }}>
          <View style={styles.filterButton}>
            <Text>Filter</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
  },
  headerBox: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#f2f2f2',
  },
  filerRowBox: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 24,
    borderColor: '#2C2F33',
    backgroundColor: '#FFF',
  },
});
