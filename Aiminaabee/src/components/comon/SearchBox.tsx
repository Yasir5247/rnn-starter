import React from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';

import { sharedIcon } from '../../utils/icons';

interface SearchBoxProps {
  data: {
    query: string;
    placeholder: string;
    loadingStatus: boolean;
  };
  actions: {
    searchQueryHandler: (query: string) => void;
  };
}

export const SearchBox: React.FC<SearchBoxProps> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={[styles.imageSection, styles.styleCenter]}>{sharedIcon('eye')}</View>
        <View style={[styles.inputSection, styles.styleCenter]}>
          <TextInput
            // autoCapitalize={false}
            underlineColorAndroid="transparent"
            placeholder={data.placeholder}
            placeholderTextColor="#ccc"
            style={styles.inputStyle}
            value={data.query}
            onChangeText={actions.searchQueryHandler}
            returnKeyType={'search'}
          />
        </View>
        <View style={[styles.loaderSection, styles.styleCenter]}>
          {data.loadingStatus ? (
            <ActivityIndicator style={{ margin: 10 }} size="small" color={'black'} />
          ) : (
            <Text>{sharedIcon('remove')}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // borderWidth: 1, borderColor: '#000'
  },
  containerInner: {
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
  },
  imageSection: {
    width: '10%',
    // borderWidth: 1, borderColor: '#000'
  },
  inputSection: {
    width: '80%',
    // borderWidth: 1, borderColor: '#000'
  },
  loaderSection: {
    width: '10%',
    // borderWidth: 1, borderColor: '#000'
  },
  inputStyle: {
    padding: 10,
    width: '100%',
    alignContent: 'center',
    fontSize: 16,
    color: '#000',
    // borderWidth: 1, borderColor: '#000',
  },
  styleCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
