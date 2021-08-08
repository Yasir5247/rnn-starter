import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

interface FollowersNotiEmptyScreenProps {
  actions: {
    onRefresh: () => void;
  };
}

export const FollowersNotiEmptyScreen: React.FC<FollowersNotiEmptyScreenProps> = ({ actions }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Image style={styles.imageStyle} source={require('../../assets/faces/yasir.jpeg')} />
          </View>
          <View>
            <Image style={styles.imageStyle} source={require('../../assets/faces/shahu.jpeg')} />
          </View>
          <View>
            <Image style={styles.imageStyle} source={require('../../assets/faces/miuxam.jpeg')} />
          </View>
        </View>
        <View style={{ marginTop: 10, justifyContent: 'center' }}>
          <Text style={styles.textStyle}>
            Check out your followers notification, once it appares
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
  imageStyle: {
    width: 80,
    height: 80,
    marginRight: 5,
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
  },
});
