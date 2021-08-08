import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

interface UserNotiEmptyScreenProps {
  actions: {
    onRefresh: () => void;
  };
}

export const UserNotiEmptyScreen: React.FC<UserNotiEmptyScreenProps> = ({ actions }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderWidth: 4,
              borderColor: '#000',
            }}
            source={require('../../assets/faces/suzan.jpeg')}
          />
        </View>
        <View style={{ marginTop: 10, justifyContent: 'center' }}>
          <Text style={styles.textStyle}>
            Hi, I'm Suzan, welcome to aiminaabee family. Happy Shopping
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => actions.onRefresh()}>
          <View style={styles.refreshButtonContainer}>
            <View>
              <Text style={{ color: '#fff' }}>Refresh </Text>
            </View>
            <View>
              {refreshing ? (
                <ActivityIndicator style={{ margin: 5 }} size="small" color={'#fff'} />
              ) : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  innerContainer: {
    width: '70%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // borderWidth: 1,
    // borderColor: '#000'
  },
  refreshButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 10,
    width: 200,
    borderRadius: 24,
    backgroundColor: '#2C2F33',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
  },
});
