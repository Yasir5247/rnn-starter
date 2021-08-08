import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//icons
import { sharedIcon } from '../../../utils/icons';

interface LogRowProps {
  data: {
    date: string;
    remarks: string;
  };
}

export const LogRow: React.FC<LogRowProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text>{sharedIcon('info')}</Text>
        </View>
        <View>
          <Text>{data.date}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text>{data.remarks}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  content: {
    paddingVertical: 10,
  },
});
